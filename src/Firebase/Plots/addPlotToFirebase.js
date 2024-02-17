"use server";
import { revalidatePath } from "next/cache";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const addPlotToDB = async ({ area, unit, usage }) => {
  const ref = collection(db, "Plot");
  try {
    await addDoc(ref, {
      area,
      unit,
      usage,
    });
    revalidatePath("/admin/roles-analytics-cities", "page");
    return { type: "success", message: "Plot added successfully!" };
  } catch (err) {
    console.error("Error adding the plot: " + err);
    return {
      type: "error",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default addPlotToDB;
