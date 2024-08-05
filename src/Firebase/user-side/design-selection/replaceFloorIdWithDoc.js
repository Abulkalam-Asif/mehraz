"use server";

import { db } from "@/Firebase/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

const replaceFloorIdWithDoc = async floorId => {
  const floorDocRef = doc(db, "FLOORS", floorId);
  try {
    const floorDoc = await getDoc(floorDocRef);
    return {
      id: floorDoc.id,
      ...floorDoc.data(),
    };
  } catch (error) {
    console.error("Error getting the floor data: ", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};

export default replaceFloorIdWithDoc;
