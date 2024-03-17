"use server";
import { revalidatePath } from "next/cache";
import { db } from "../../../firebase";
import {
  doc,
  updateDoc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";

const updatePlotInDB = async ({ id, area, unit, category }) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, "PLOTS"),
        where("area", "==", area),
        where("unit", "==", unit),
      ),
    );
    if (querySnapshot.docs.length !== 0) {
      const duplicatePlot = querySnapshot.docs.find(doc => doc.id !== id);
      if (duplicatePlot) {
        return {
          type: ERROR,
          message: "Plot with this area and unit already exists.",
        };
      }
    }

    const cityRef = doc(db, "PLOTS", id);

    await updateDoc(cityRef, {
      area: area,
      unit: unit,
      category: category,
    });
    revalidatePath("/admin/roles-analytics-cities", "page");
    return { type: "SUCCESS", message: "Plot updated successfully!" };
  } catch (error) {
    console.error("Error updating the plot:", error);
    return {
      type: ERROR,
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updatePlotInDB;
