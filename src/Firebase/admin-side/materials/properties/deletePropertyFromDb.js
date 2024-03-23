"use server";

import { db } from "@/Firebase/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  deleteDoc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

const deletePropertyFromDb = async id => {
  try {
    const propertyRef = doc(db, "PROPERTIES", id);
    const propertyDoc = await getDoc(propertyRef);
    const { city } = propertyDoc.data();
    const cityRef = doc(db, "CITIES", city);
    const cityDoc = await getDoc(cityRef);
    if (cityDoc.exists()) {
      await updateDoc(cityRef, {
        [`usage.properties`]: increment(-1),
      });
    }
    deleteDoc(propertyRef);
    revalidatePath("/admin/materials", "page");
    return { type: "SUCCESS", message: "Property deleted successfully." };
  } catch (error) {
    console.error("Error deleting property: ", error);
    return { type: "ERROR", message: "An error occurred. Please try again." };
  }
};

export default deletePropertyFromDb;
