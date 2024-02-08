"use server";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const addPlotToDB = async ({ area, unit, usage }) => {
  const ref = collection(db, "Plot");
  return addDoc(ref, {
    area,
    unit,
    usage,
  }).catch((err) => {
    console.error("Firebase Error: " + err);
  });
};

export default addPlotToDB;
