"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/Firebase/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

const deleteCityFromDB = async id => {
  try {
    const cityRef = doc(db, "CITIES", id);
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
          type: "ERROR",
          message: `This city cannot be deleted. This is being used in ${usageCases.slice(
            0,
            -2,
          )}.`,
        };
      } else {
        await deleteDoc(cityRef);
        revalidatePath("/admin/roles-analytics-cities", "page");
        return {
          type: "SUCCESS",
          message: "City deleted successfully.",
        };
      }
    } else {
      return {
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }
  } catch (error) {
    console.error("Error deleting the city: ", error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default deleteCityFromDB;
