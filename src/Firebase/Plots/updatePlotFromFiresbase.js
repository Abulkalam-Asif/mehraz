"use server";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const updatePlotInDB = async ({ id, area, unit }) => {
  try {
    const cityRef = doc(db, "Plot", id);

    await updateDoc(cityRef, {
      area: area,
      unit: unit,
    });
  } catch (error) {
    console.error("Error getting/updating document:", error);
  }
};

export default updatePlotInDB;
