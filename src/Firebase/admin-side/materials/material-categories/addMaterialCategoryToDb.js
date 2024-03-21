"use server";
import { revalidatePath } from "next/cache";
import { db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";

const addMaterialCategoryToDb = async ({ name }) => {
  const ref = collection(db, "MATERIAL_CATEGORIES");

  const queryResult = query(ref, where("name", "==", name));

  const querySnapshot = await getDocs(queryResult);

  if (!querySnapshot.empty) {
    return {
      type: "ERROR",
      message: "Category with this name already exists.",
    };
  }

  try {
    await addDoc(ref, {
      name,
      usage: 0,
      fixedMaterial: null,
    });
    revalidatePath("/admin/materials", "page");
    return { type: "SUCCESS", message: "Category added successfully!" };
  } catch (err) {
    console.error("Error adding the category:", err);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default addMaterialCategoryToDb;
