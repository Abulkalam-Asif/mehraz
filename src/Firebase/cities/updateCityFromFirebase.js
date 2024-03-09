"use server";
import { revalidatePath } from "next/cache";
import { db } from "../firebase";
import {
	doc,
	getDoc,
	updateDoc,
	collection,
	query,
	where,
	getDocs,
} from "firebase/firestore";

const updateCityInDB = async ({ id, name }) => {
	try {
		const cityRef = doc(db, "CITIES", id);

		const citiesCollectionRef = collection(db, "CITIES");
		const queryResult = query(citiesCollectionRef, where("name", "==", name));

		const querySnapshot = await getDocs(queryResult);

		if (!querySnapshot.empty) {
			return { type: "ERROR", message: "City with this name already exists." };
		}

		const docSnapshot = await getDoc(cityRef);

		if (docSnapshot.exists()) {
			await updateDoc(cityRef, {
				name: name,
				usage: docSnapshot.data().usage,
			});
			revalidatePath("/admin/roles-analytics-cities", "page");
			return { type: "SUCCESS", message: "City updated successfully!" };
		} else {
			return {
				type: "ERROR",
				message: "Something went wrong, please try again later.",
			};
		}
	} catch (error) {
		console.error("Error updating the city:", error);
		return {
			type: "ERROR",
			message: "Something went wrong, please try again later.",
		};
	}
};

export default updateCityInDB;
