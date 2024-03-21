"use server";
import { revalidatePath } from "next/cache";
import { db } from "../../../firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";

const updateMaterialCategoryFromDb = async ({ id, name }) => {
  try {
    const categoryRef = doc(db, "MATERIAL_CATEGORIES", id);

    const querySnapshot = await getDocs(
      query(collection(db, "MATERIAL_CATEGORIES"), where("name", "==", name)),
    );
    const duplicateCategory = querySnapshot.docs.find(doc => doc.id !== id);
    if (duplicateCategory) {
      return {
        type: ERROR,
        message: "Category with this name already exists.",
      };
    }
    const docSnapshot = await getDoc(categoryRef);

    if (docSnapshot.exists()) {
      await updateDoc(categoryRef, {
        name: name,
      });
      revalidatePath("/admin/materials", "page");
      return { type: "SUCCESS", message: "Category updated successfully!" };
    } else {
      return {
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }
  } catch (error) {
    console.error("Error updating the category:", error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updateMaterialCategoryFromDb;
