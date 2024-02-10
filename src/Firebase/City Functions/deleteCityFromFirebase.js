"use server";
import { revalidatePath } from "next/cache";
import { db } from "../firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

const deleteCityFromDB = async (id) => {
  try {
    const cityRef = doc(db, "City", id);
    const docSnapshot = await getDoc(cityRef);

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
          type: "error",
          message: `City cannot be deleted. It is being used in ${usageCases.slice(
            0,
            -2
          )}.`,
        };
      }
      await deleteDoc(cityRef);
      revalidatePath("/admin/roles-analytics-cities", "page");
      return { type: "success", message: "Document deleted successfully!" };
    } else {
      return {
        type: "error",
        message: "Document deletion failed. Please try again later.",
      };
    }
  } catch (error) {
    console.log("Error deleting the city: ", error);
    return {
      type: "error",
      message: "Document deletion failed. Please try again later.",
    };
  }
};

export default deleteCityFromDB;
