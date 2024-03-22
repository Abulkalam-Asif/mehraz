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
const { ulid } = require("ulid");

const addNewMaterialToDb = async ({
  isFixed,
  name,
  vendor,
  rate,
  category,
  description,
  specs,
  orderedAs,
  image,
  cover,
  displayCover,
  usage,
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
    const imageRef = ref(storage, `MATERIALS/${id}/image`);
    const coverRef = ref(storage, `MATERIALS/${id}/cover`);
    await Promise.all([
      uploadBytes(imageRef, image.get("image")),
      uploadBytes(coverRef, cover.get("cover")),
    ]);

    const newDocRef = doc(materialsCollectionRef, id);
    await setDoc(newDocRef, {
      isFixed,
      name,
      vendor,
      rate,
      category,
      description,
      specs,
      orderedAs,
      displayCover,
      usage,
    });

    // Update the category usage and fixedMaterial
    const categoryDocRef = doc(collection(db, "MATERIAL_CATEGORIES"), category);
    const categoryDoc = await getDoc(categoryDocRef);
    if (isFixed) {
      const fixedMaterialOfCategory = categoryDoc.data().fixedMaterial;
      if (fixedMaterialOfCategory) {
        await updateDoc(doc(materialsCollectionRef, fixedMaterialOfCategory), {
          isFixed: false,
        });
      }
    }

    // Update the category usage and fixedMaterial
    await updateDoc(categoryDocRef, {
      usage: increment(1),
      fixedMaterial: isFixed ? id : categoryDoc.data().fixedMaterial,
    });

    // Revalidate the cache
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
