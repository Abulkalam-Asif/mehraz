"use server";
import { db } from "@/Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const getFloorsFromDb = async (fields = ["id", "name"]) => {
  const floorsRef = collection(db, "FLOORS");
  const floors = [];
  try {
    const floorDocs = await getDocs(floorsRef);
    floorDocs.forEach(doc => {
      const data = doc.data();
      const docData = {};
      fields.forEach(field => {
        if (field === "id") {
          docData[field] = doc.id;
          return;
        }
        docData[field] = data[field];
      });
      floors.push(docData);
    });
    return floors;
  } catch (error) {
    console.error("Error fetching floors from DB:", error);
    throw new Error("An error occurred. Please try again.");
  }
};

export default getFloorsFromDb;
