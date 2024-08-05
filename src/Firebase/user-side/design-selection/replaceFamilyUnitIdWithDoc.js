"use server";

import { db } from "@/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const replaceFamilyUnitIdWithDoc = async familyUnitId => {
  const familyUnitDocRef = doc(db, "FAMILY_UNITS", familyUnitId);
  try {
    const familyUnitDoc = await getDoc(familyUnitDocRef);
    return {
      id: familyUnitDoc.id,
      ...familyUnitDoc.data(),
    };
  } catch (error) {
    console.error("Error getting the family unit data: ", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};

export default replaceFamilyUnitIdWithDoc;
