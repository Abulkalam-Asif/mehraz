"use server";
import { revalidatePath } from "next/cache";
import { db, storage } from "@/Firebase/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const deleteMaterialCategoryFromDb = async id => {
  try {
    const categoryRef = doc(db, "MATERIAL_CATEGORIES", id);
    const docSnapshot = await getDoc(categoryRef);

    if (docSnapshot.exists()) {
      let usage = docSnapshot.data().usage;
      if (usage !== 0) {
        return {
          type: "ERROR",
          message: `This category is being used in MATERIALS and can't be deleted.`,
        };
      } else {
        // Delete the cover image from storage
        const imageRef = ref(storage, `MATERIAL_CATEGORIES/${id}/image`);
        const coverImageRef = ref(storage, `MATERIAL_CATEGORIES/${id}/cover`);
        try {
          await deleteObject(imageRef);
          await deleteObject(coverImageRef);
        } catch (error) {}
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
