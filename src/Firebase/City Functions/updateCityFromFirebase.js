import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const updateCityInDB = async ({ id, name }) => {
	if (id === undefined || name === undefined) {
		console.error("One or more required parameters are missing");
		return;
	}

	try {
		const cityRef = doc(db, "City", id);
		const docSnapshot = await getDoc(cityRef);

		if (docSnapshot.exists()) {

			await updateDoc(cityRef, {
				name: name,
				usage: docSnapshot.data().usage,
			});

			console.log("Document updated successfully");
		} else {
			console.log("No such document!");
		}
	} catch (error) {
		console.error("Error getting/updating document:", error);
	}
};

export default updateCityInDB;
