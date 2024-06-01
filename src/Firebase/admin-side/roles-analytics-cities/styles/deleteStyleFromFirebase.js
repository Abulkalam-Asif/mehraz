"use server";
import { db, storage } from "@/Firebase/firebase";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { revalidatePath } from "next/cache";

const deleteStyleFromDB = async (styleId) => {
  try {
    const docRef = doc(db, "STYLES", styleId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      let usage = docSnapshot.data().usage;
      let usageCases = "";
      for (const key in usage) {
        if (usage[key] !== 0) {
          usageCases += key.toUpperCase() + ", ";
        }
      }
      if (usageCases !== "") {
        return {
          type: "ERROR",
          message: `This style cannot be deleted. This is being used in ${usageCases.slice(
            0,
            -2,
          )}.`,
        };
      } else {
        const data = docSnapshot.data();
        if (data) {
          const imageRef = ref(storage, `STYLES/${styleId}`);
          await deleteObject(imageRef);
        }
        await deleteDoc(docRef);
        revalidatePath("/admin/roles-analytics-cities", "page");
        return {
          type: "SUCCESS",
          message: "Style deleted successfully.",
        };
      }
    } else {
      return {
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }
  } catch (error) {
    console.error("Error deleting the style: ", error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default deleteStyleFromDB;
