"use server";
import { revalidatePath } from "next/cache";
import { db } from "../../../firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

const deleteMaterialCategoryFromDb = async id => {
  try {
    const categoryRef = doc(db, "MATERIAL_CATEGORIES", id);
    const docSnapshot = await getDoc(categoryRef);

    if (docSnapshot.exists()) {
      let usage = docSnapshot.data().usage;
      if (usage !== 0) {
        return {
          type: "ERROR",
          message: `This category being used in MATERIALS and can't be deleted.`,
        };
      } else {
        await deleteDoc(categoryRef);
        revalidatePath("/admin/materials", "page");
        return {
          type: "SUCCESS",
          message: "Category deleted successfully.",
        };
      }
    } else {
      return {
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }
  } catch (error) {
    console.error("Error deleting the category: ", error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default deleteMaterialCategoryFromDb;
