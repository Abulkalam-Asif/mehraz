"use server";
import { revalidatePath } from "next/cache";
import { collection, doc, setDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { ulid } from "ulid";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/Firebase/firebase";

const addMaterialCategoryToDb = async ({
  name,
  image,
  coverImage,
  fixCoverImage,
}) => {
  try {
    // Check if the category already exists
    const collectionRef = collection(db, "MATERIAL_CATEGORIES");
    const queryResult = query(collectionRef, where("name", "==", name));
    const querySnapshot = await getDocs(queryResult);
    if (!querySnapshot.empty) {
      return {
        type: "ERROR",
        message: "Category with this name already exists.",
      };
    }

    const id = ulid();
    // Upload the image
    const imageRef = ref(storage, `MATERIAL_CATEGORIES/${id}/image`);
    await uploadBytes(imageRef, image.get("image"));
    // Upload the cover image if it exists
    if (coverImage) {
      const coverImageRef = ref(storage, `MATERIAL_CATEGORIES/${id}/cover`);
      await uploadBytes(coverImageRef, coverImage.get("coverImage"));
    }

    // Add the category to the database
    const newDocRef = doc(collectionRef, id);
    await setDoc(newDocRef, {
      name,
      fixCoverImage,
      usage: 0,
      fixedMaterialId: null,
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
