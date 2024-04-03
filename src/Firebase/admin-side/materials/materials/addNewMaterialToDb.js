"use server";
import { db, storage } from "@/Firebase/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { revalidatePath } from "next/cache";
import {
  collection,
  getDocs,
  where,
  query,
  setDoc,
  doc,
  increment,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { ulid } from "ulid";

const addNewMaterialToDb = async ({
  isFixed,
  name,
  vendor,
  rate,
  category,
  description,
  specs,
  orderedAs,
  image1,
  image2,
  cities
}) => {
  try {
    const materialsCollectionRef = collection(db, "MATERIALS");
    const queryResult = await getDocs(
      query(materialsCollectionRef, where("name", "==", name)),
    );
    if (!queryResult.empty) {
      return {
        type: "ERROR",
        message: "Material with this name already exists.",
      };
    }

    const id = ulid();
    const image1Ref = ref(storage, `MATERIALS/${id}/image1`);
    const image2Ref = ref(storage, `MATERIALS/${id}/image2`);
    await Promise.all([
      uploadBytes(image1Ref, image1.get("image1")),
      uploadBytes(image2Ref, image2.get("image2")),
    ]);

    const newDocRef = doc(materialsCollectionRef, id);
    await setDoc(newDocRef, {
      name,
      vendor,
      rate,
      category,
      description,
      specs,
      orderedAs,
      cities,
      usage: {
        projects: 0,
      },
    });

    // Update the category usage and fixedMaterialId
    const categoryDocRef = doc(collection(db, "MATERIAL_CATEGORIES"), category);
    const categoryDoc = await getDoc(categoryDocRef);
    await updateDoc(categoryDocRef, {
      usage: increment(1),
      fixedMaterialId: isFixed ? id : categoryDoc.data().fixedMaterialId,
    });
    revalidatePath("/admin/materials", "page");

    return {
      type: "SUCCESS",
      message: "Material added successfully!",
    };
  } catch (error) {
    console.error("Error adding the material: " + error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default addNewMaterialToDb;
