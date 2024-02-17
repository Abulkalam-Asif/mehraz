"use server";
import { revalidatePath } from "next/cache";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const updateCityInDB = async ({ id, name }) => {
  try {
    const cityRef = doc(db, "CITIES", id);
    const docSnapshot = await getDoc(cityRef);

    if (docSnapshot.exists()) {
      await updateDoc(cityRef, {
        name: name,
        usage: docSnapshot.data().usage,
      });
      revalidatePath("/admin/roles-analytics-cities", "page");
      return { type: "success", message: "City updated successfully!" };
    } else {
      return {
        type: "error",
        message: "Something went wrong, please try again later.",
      };
    }
  } catch (error) {
    console.error("Error updating the city:", error);
    return {
      type: "error",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updateCityInDB;
