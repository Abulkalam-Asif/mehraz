"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/Firebase/firebase";
import {
	addDoc,
	collection,
	doc,
	updateDoc,
	increment,
	where,
	query,
	getDocs,
	getDoc,
} from "firebase/firestore";

const addCurrencyToDB = async ({ name, valueInPkr, cities, usage }) => {
	const ref = collection(db, "CURRENCIES");

	const queryResult = query(ref, where("name", "==", name));
	const querySnapshot = await getDocs(queryResult);

	if (!querySnapshot.empty) {
		return {
			type: "ERROR",
			message: "Currency with this name already exists.",
		};
	}

	
	try {
		const cityExistPromises = cities.map(async (id) => {
			const cityDoc = doc(db, "CITIES", id);
			const citySnapshot = await getDoc(cityDoc);
			if (!citySnapshot.exists()) {
				throw new Error(`City with ID ${id} does not exist.`);
			}
		});

		await Promise.all(cityExistPromises);

		await Promise.all(
			cities.map(async (id) => {
				const cityRef = doc(db, "CITIES", id);
				await updateDoc(cityRef, {
					[`usage.currencies`]: increment(1),
				});
			})
		);

		await addDoc(ref, {
			name,
			valueInPkr,
			cities,
			usage,
		});

		revalidatePath("/admin/roles-analytics-cities", "page");
		return { type: "SUCCESS", message: "Currency added successfully!" };
	} catch (err) {
		console.error("Error adding the currency:", err);
		return {
			type: "ERROR",
			message: "Something went wrong, please try again later.",
		};
	}
};

export default addCurrencyToDB;
