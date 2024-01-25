import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const addPlotToDB = async (area,unit) => {
	const ref = collection(db, "Plot");
	return addDoc(ref, {
		area: area,
        unit: unit,
	}).catch((err) => {
		console.error("Firebase Error: " + err);
	});
};

export default addPlotToDB;
