"use server";
import { db, storage } from "@/Firebase/firebase";
import { doc, updateDoc, getDoc,getDocs,query,where, collection } from "firebase/firestore";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { revalidatePath } from "next/cache";

const updateStyleInDB = async ({ id, name, budget, image }) => {
  try {

    const querySnapshot = await getDocs(
      query(collection(db, "STYLES"), where("name", "==", name)),
    );
    const duplicateOffice = querySnapshot.docs.find(doc => doc.id !== id);
    if (duplicateOffice) {
      return {
        type: "ERROR",
        message: "Style with this name already exists.",
      };
    }
    const docRef = doc(db, "STYLES", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (image !== null && image instanceof FormData) {
        const previousImageRef = ref(storage, `STYLES/${id}`);
        await deleteObject(previousImageRef);

        const imageRef = ref(storage, `STYLES/${id}`);
        await uploadBytes(imageRef, image.get("image"));
      }

      await updateDoc(docRef, {
        name: name,
        budget: budget,
      });
      revalidatePath("/admin/roles-analytics-cities", "page");
      return { type: "SUCCESS", message: "Style updated successfully!" };
    } else {
      return {
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }
  } catch (error) {
    console.error("Error updating the style:", error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updateStyleInDB;
