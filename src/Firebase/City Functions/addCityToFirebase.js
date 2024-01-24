import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const addCityToDB = async (newCity) => {
	const ref = collection(db, "City");
	return addDoc(ref, {
		city: newCity,
	}).catch((err) => {
		console.error("Firebase Error: " + err);
	});
};

export default addCityToDB;
