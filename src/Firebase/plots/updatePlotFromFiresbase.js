"use server";
import { revalidatePath } from "next/cache";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const updatePlotInDB = async ({ id, area, unit }) => {
  try {
    const cityRef = doc(db, "PLOTS", id);

    await updateDoc(cityRef, {
      area: area,
      unit: unit,
    });
    revalidatePath("/admin/roles-analytics-cities", "page");
    return { type: "success", message: "Plot updated successfully!" };
  } catch (error) {
    console.error("Error updating the plot:", error);
    return {
      type: "error",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updatePlotInDB;
