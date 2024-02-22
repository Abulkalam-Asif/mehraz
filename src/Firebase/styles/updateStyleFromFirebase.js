"use server";
import { db, storage } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { revalidatePath } from "next/cache";

const updateStyleInDB = async ({ id, name, budget, image }) => {
  try {
    const docRef = doc(db, "STYLES", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (image !== null && image instanceof FormData) {
        const previousImageRef = ref(storage, `Styles/${id}`);
        await deleteObject(previousImageRef);

        const imageRef = ref(storage, `Styles/${id}`);
        await uploadBytes(imageRef, image.get("image"));
      }

      await updateDoc(docRef, {
        name: name,
        budget: budget,
      });
      revalidatePath("/admin/roles-analytics-cities", "page");
      return { type: "success", message: "Style updated successfully!" };
    } else {
      return {
        type: "error",
        message: "Something went wrong, please try again later.",
      };
    }
  } catch (error) {
    console.error("Error updating the style:", error);
    return {
      type: "error",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updateStyleInDB;
