"use server";
import { db, storage } from "@/Firebase/firebase";
import { deleteObject, ref } from "firebase/storage";
import { revalidatePath } from "next/cache";
import {
  doc,
  increment,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

const deleteMaterialFromDb = async id => {
  try {
    const materialRef = doc(db, "MATERIALS", id);
    const materialDoc = await getDoc(materialRef);

    const { category } = materialDoc.data();
    const categoryRef = doc(db, "MATERIAL_CATEGORIES", category);
    const categoryDoc = await getDoc(categoryRef);
    if (categoryDoc.data().fixedMaterialId === id) {
      await updateDoc(categoryRef, {
        fixedMaterialId: null,
        usage: increment(-1),
      });
    } else {
      await updateDoc(categoryRef, {
        usage: increment(-1),
      });
    }
    await deleteDoc(materialRef);

    await Promise.all([
      deleteObject(ref(storage, `MATERIALS/${id}/image1`)),
      deleteObject(ref(storage, `MATERIALS/${id}/image2`)),
    ]);

    revalidatePath("/admin/materials", "page");
    return { type: "SUCCESS", message: "Material deleted successfully." };
  } catch (error) {
    console.error("Error deleting material: ", error);
    return { type: "ERROR", message: "An error occurred. Please try again." };
  }
};

export default deleteMaterialFromDb;
