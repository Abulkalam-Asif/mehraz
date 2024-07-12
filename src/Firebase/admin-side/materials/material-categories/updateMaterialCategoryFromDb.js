"use server";
import { revalidatePath } from "next/cache";
import { db, storage } from "@/Firebase/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const updateMaterialCategoryFromDb = async ({
  id,
  name,
  image,
  coverImage,
  fixCoverImage,
}) => {
  try {
    const categoryRef = doc(db, "MATERIAL_CATEGORIES", id);

    const querySnapshot = await getDocs(
      query(collection(db, "MATERIAL_CATEGORIES"), where("name", "==", name)),
    );
    const duplicateCategory = querySnapshot.docs.find(doc => doc.id !== id);
    if (duplicateCategory) {
      return {
        type: "ERROR",
        message: "Category with this name already exists.",
      };
    }

    // Update the image if it is provided
    if (image instanceof FormData) {
      const imageRef = ref(storage, `MATERIAL_CATEGORIES/${id}/image`);
      await uploadBytes(imageRef, image.get("image"));
    }
    // Update the cover image if it is provided
    if (coverImage instanceof FormData) {
      const coverImageRef = ref(storage, `MATERIAL_CATEGORIES/${id}/cover`);
      await uploadBytes(coverImageRef, coverImage.get("coverImage"));
    }

    // Update the category in the database
    await updateDoc(categoryRef, {
      name,
      fixCoverImage,
    });
    revalidatePath("/admin/materials", "page");
    return { type: "SUCCESS", message: "Category updated successfully!" };
  } catch (error) {
    console.error("Error updating the category:", error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updateMaterialCategoryFromDb;
