"use server";
import { db } from "@/Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const getAllChanges = async () => {
  const changesCollection = collection(db, "CHANGES");
  try {
    const changesDocs = await getDocs(changesCollection);
    let changes = [];
    if (changesDocs.empty) {
      return [];
    } else {
      changesDocs.forEach(doc => {
        changes.push({
          id: doc.id,
          changes: doc.data().changes,
          rate: doc.data().rate,
        });
      });
    }
    return changes;
  } catch (error) {
    console.error("Error getting changes: ", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};

export default getAllChanges;
