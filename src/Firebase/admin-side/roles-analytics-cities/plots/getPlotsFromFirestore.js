"use server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/firebase";

const getPlotsFromDB = async (fields = ["id", "area", "unit", "category"]) => {
  
  const plotsRef = collection(db, "PLOTS");
  const plots = [];
  try {
    const plotDocs = await getDocs(plotsRef);
    plotDocs.forEach(doc => {
      const data = doc.data();
      const docData = {};
      fields.forEach(field => {
        if (field === "id") {
          docData[field] = doc.id;
          return;
        }
        docData[field] = data[field];
      });
      plots.push(docData);
    });
    return plots;
  } catch (error) {
    console.error("Error fetching plots from DB:", error);
    throw new Error("An error occurred. Please try again.");
  }
};

export default getPlotsFromDB;
