"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/Firebase/firebase";
import { addDoc, collection, getDocs, query, where,doc,updateDoc,increment } from "firebase/firestore";

const addPlotToDB = async ({ area, unit, category, usage }) => {
  const querySnapshot = await getDocs(
    query(
      collection(db, "PLOTS"),
      where("area", "==", area),
      where("unit", "==", unit),
    ),
  );
  if (!querySnapshot.empty) {
    return {
      type: "ERROR",
      message: "Plot with this area and unit already exists.",
    };
  }
  const ref = collection(db, "PLOTS");
  try {
    await addDoc(ref, {
      area,
      unit,
      category,
      usage,
    });
    const unitRef = doc(db, "UNITS", unit);
    await updateDoc(unitRef, {
      [`usage.plots`]: increment(1),
    });
    revalidatePath("/admin/roles-analytics-cities", "page");
    return { type: "SUCCESS", message: "Plot added successfully!" };
  } catch (err) {
    console.error("Error adding the plot: " + err);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default addPlotToDB;
