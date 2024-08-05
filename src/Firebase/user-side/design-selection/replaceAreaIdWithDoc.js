"use server";

import { db } from "@/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const replaceAreaIdWithDoc = async areaId => {
  const areaDocRef = doc(db, "AREAS", areaId);
  try {
    const areaDoc = await getDoc(areaDocRef);
    return {
      id: areaDoc.id,
      ...areaDoc.data(),
    };
  } catch (error) {
    console.error("Error getting the area data: ", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};

export default replaceAreaIdWithDoc;
