"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/Firebase/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const updateCityInDB = async ({ id, name }) => {
  try {
    const cityRef = doc(db, "CITIES", id);

    const querySnapshot = await getDocs(
      query(collection(db, "CITIES"), where("name", "==", name)),
    );
    const duplicateCity = querySnapshot.docs.find(doc => doc.id !== id);
    if (duplicateCity) {
      return {
        type: "ERROR",
        message: "City with this name already exists.",
      };
    }
    const docSnapshot = await getDoc(cityRef);

    if (docSnapshot.exists()) {
      await updateDoc(cityRef, {
        name: name,
        usage: docSnapshot.data().usage,
      });
      revalidatePath("/admin/roles-analytics-cities", "page");
      return { type: "SUCCESS", message: "City updated successfully!" };
    } else {
      return {
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }
  } catch (error) {
    console.error("Error updating the city:", error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updateCityInDB;
