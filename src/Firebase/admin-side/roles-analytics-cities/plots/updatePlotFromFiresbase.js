"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/Firebase/firebase";
import { doc, updateDoc, getDoc, increment } from "firebase/firestore";

const updatePlotInDB = async ({ id, area, unit, category }) => {
  try {
    const plotRef = doc(db, "PLOTS", id);
    const plotDoc = await getDoc(plotRef);
    const previousUnit = plotDoc.data().unit;

    if (unit !== previousUnit) {
      const unitRef = doc(db, "UNITS", previousUnit);
      await updateDoc(unitRef, {
        [`usage.plots`]: increment(-1),
      });

      const newUnitRef = doc(db, "UNITS", unit);
      await updateDoc(newUnitRef, {
        [`usage.plots`]: increment(1),
      });
    }

    await updateDoc(plotRef, {
      area: area,
      unit: unit,
      category: category,
    });

    revalidatePath("/admin/roles-analytics-cities", "page");
    return { type: "SUCCESS", message: "Plot updated successfully!" };
  } catch (error) {
    console.error("Error updating the plot:", error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updatePlotInDB;
