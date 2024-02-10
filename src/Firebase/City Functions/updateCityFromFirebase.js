"use server";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const updateCityInDB = async ({ id, name }) => {
  if (id === undefined || name === undefined) {
    console.error("One or more required parameters are missing");
    return;
  }

  try {
    const cityRef = doc(db, "City", id);
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
        message: "City updation failed. Please try again later.",
      };
    }
  } catch (error) {
    console.error("Error updating the city:", error);
    return {
      type: "error",
      message: "City updation failed. Please try again later.",
    };
  }
};

export default updateCityInDB;
