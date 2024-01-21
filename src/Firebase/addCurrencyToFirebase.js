import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

const addCurrencyToDB = async ( name, valueInPkr, cities ) => {
	const ref = collection(db, "Currency");
	return addDoc(ref, {
		name: name,
		valueInPkr: valueInPkr,
		cities: cities,
	})
		.catch((err) => {
			console.error("Firebase Error: " + err);
		});
};

export default addCurrencyToDB;
