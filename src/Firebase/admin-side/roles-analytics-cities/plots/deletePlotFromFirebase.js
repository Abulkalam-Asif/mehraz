"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/Firebase/firebase";
import { deleteDoc,  getDoc,doc,updateDoc,increment } from "firebase/firestore";

const deletePlotFromDB = async id => {
  try {
    const PlotRef = doc(db, "PLOTS", id);
    const docSnapshot = await getDoc(PlotRef);

    if (docSnapshot.exists()) {
      let usage = docSnapshot.data().usage;
      let usageCases = "";
      for (const key in usage) {
        if (usage[key] !== 0) {
          usageCases += key.toUpperCase() + ", ";
        }
      }
      if (usageCases !== "") {
        return {
          type: "ERROR",
          message: `This plot cannot be deleted. This is being used in ${usageCases.slice(
            0,
            -2,
          )}.`,
        };
      } else {
        await deleteDoc(PlotRef);

        const unitRef = doc(db, "UNITS", docSnapshot.data().unit);
        await updateDoc(unitRef, {
          [`usage.plots`]: increment(-1),
        });

        revalidatePath("/admin/roles-analytics-cities", "page");
        return {
          type: "SUCCESS",
          message: "Plot deleted successfully.",
        };
      }
    } else {
      return {
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }
  } catch (error) {
    console.error("Error deleting the plot: ", error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default deletePlotFromDB;
