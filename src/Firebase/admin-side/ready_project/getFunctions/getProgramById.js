"use server";

import { db } from "@/Firebase/firebase";

import { doc, collection, getDoc } from "firebase/firestore";

const getProgramById = async programId => {
  const programDocRef = doc(collection(db, "PROGRAMS"), programId);
  try {
    const programDoc = await getDoc(programDocRef);
    if (programDoc.exists()) {
      return {
        id: programId,
        category: programDoc.data().category,
        quantity: programDoc.data().quantity,
        subCategories: programDoc.data().subCategories,
      };
    } else {
      console.error("Program not found:", error);
      throw new Error("An error occured. Please try again.");
    }
  } catch (error) {
    console.error("Error getting program:", error);
    throw new Error("An error occured. Please try again.");
  }
};

export default getProgramById;
