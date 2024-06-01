"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/Firebase/firebase";
import {
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

const deleteCurrencyFromDB = async (id) => {
  try {
    const currencyRef = doc(db, "CURRENCIES", id);
    const docSnapshot = await getDoc(currencyRef);

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
          message: `This currency cannot be deleted. This is being used in ${usageCases.slice(
            0,
            -2
          )}.`,
        };
      } else {
        let cities = docSnapshot.data().cities;

        cities.forEach(async (cityId) => {
          const cityRef = doc(db, "CITIES", cityId);
          await updateDoc(cityRef, {
            [`usage.currencies`]: increment(-1),
          });
        });
        await deleteDoc(currencyRef);
        revalidatePath("/admin/roles-analytics-cities", "page");
        return { type: "SUCCESS", message: "Currency deleted successfully!" };
      }
    } else {
      return {
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }
  } catch (error) {
    console.error("Error deleting the currency: ", error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default deleteCurrencyFromDB;
