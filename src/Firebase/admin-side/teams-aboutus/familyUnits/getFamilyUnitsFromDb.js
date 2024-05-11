"use server";
import { db } from "@/Firebase/firebase";

import { collection, getDocs } from "firebase/firestore";

const getFamilyUnitsFromDb = async (fields = ["id", "name"]) => {
  const familyUnitsRef = collection(db, "FAMILY_UNITS");
  const familyUnits = [];
  try {
    const familyUnitsDocs = await getDocs(familyUnitsRef);
    familyUnitsDocs.forEach(doc => {
      const data = doc.data();
      const docData = {};
      fields.forEach(field => {
        if (field === "id") {
          docData[field] = doc.id;
          return;
        }
        docData[field] = data[field];
      });
      familyUnits.push(docData);
    });
    return familyUnits;
  } catch (error) {
    console.error("Error fetching familyUnits from DB:", error);
    throw new Error("An error occurred. Please try again.");
  }
};

export default getFamilyUnitsFromDb;
