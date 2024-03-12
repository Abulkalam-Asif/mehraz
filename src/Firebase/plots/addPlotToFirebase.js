"use server";
import { revalidatePath } from "next/cache";
import { db } from "../firebase";
import { addDoc, collection,getDocs,query,where } from "firebase/firestore";

const addPlotToDB = async ({ area, unit, usage }) => {

	
	const querySnapshot =await getDocs(
		query(
			collection(db, "PLOTS"),
			where("area", "==",area),
			where("unit", "==",unit)
		)
	);
  if (!querySnapshot.empty) {
    return {
      type: "error",
      message: "Plot with this area and unit already exists.",
    };
  }
	const ref = collection(db, "PLOTS");
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
