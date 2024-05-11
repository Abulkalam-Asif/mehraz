"use server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/firebase";

const getUnitsFromDb = async (fields = ["id", "name", "valueInSqFt"]) => {
  const unitsRef = collection(db, "UNITS");
  const units = [];
  try {
    const unitDocs = await getDocs(unitsRef);
    unitDocs.forEach(doc => {
      const data = doc.data();
      const docData = {};
      fields.forEach(field => {
        if (field === "id") {
          docData[field] = doc.id;
          return;
        }
        docData[field] = data[field];
      });
      units.push(docData);
    });
    return units;
  } catch (error) {
    console.error("Error fetching units from DB:", error);
    throw new Error("An error occurred. Please try again.");
  }
};

export default getUnitsFromDb;
