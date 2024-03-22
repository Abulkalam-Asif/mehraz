"use server";
import { db, storage } from "@/Firebase/firebase";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
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

const deleteMaterialFromDb = async id => {
  try {
    const materialRef = doc(db, "MATERIALS", id);
    const materialDoc = await getDoc(materialRef);
    const { image, cover, category } = materialDoc.data();
    await Promise.all([
      deleteObject(ref(storage, image)),
      deleteObject(ref(storage, cover)),
    ]);

    revalidatePath("/admin/materials", "page");
    return { type: "SUCCESS", message: "Material updated successfully." };
  } catch (error) {
    console.error("Error updating material: ", error);
    return { type: "ERROR", message: "An error occurred. Please try again." };
  }
};

export default deleteMaterialFromDb;
