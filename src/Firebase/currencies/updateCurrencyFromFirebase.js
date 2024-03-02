"use server";
import { revalidatePath } from "next/cache";
import { db } from "../firebase";
import {
	doc,
  collection,
	getDoc,
	updateDoc,
	increment,
	where,
	query,
	getDocs,
} from "firebase/firestore";

const updateCurrencyInDB = async (currentCurrency, prevCities) => {
	let { id, name, cities, valueInPkr } = currentCurrency;
	const ref = collection(db, "CURRENCIES");

	
	try {
		const currencyExistPromises = cities.map(async (id) => {
			const cityDoc = doc(db, "CITIES", id);
			const citySnapshot = await getDoc(cityDoc);
			if (!citySnapshot.exists()) {
				throw new Error(`City with ID ${id} does not exist.`);
			}
		});

		await Promise.all(currencyExistPromises);

		const newlyAddedCities = cities.filter(
			(cityId) => !prevCities.includes(cityId)
		);

		const currencyRef = doc(db, "CURRENCIES", id);
		const docSnapshot = await getDoc(currencyRef);

		if (docSnapshot.exists()) {
			await updateDoc(currencyRef, {
				name: name,
				valueInPkr: valueInPkr,
				cities: cities,
				usage: docSnapshot.data().usage,
			});

			newlyAddedCities.forEach(async (cityId) => {
				const cityRef = doc(db, "CITIES", cityId);
				await updateDoc(cityRef, {
					[`usage.currencies`]: increment(1),
				});
			});

			prevCities.forEach(async (cityId) => {
				if (!cities.includes(cityId)) {
					const cityRef = doc(db, "CITIES", cityId);
					await updateDoc(cityRef, {
						[`usage.currencies`]: increment(-1),
					});
				}
			});

			revalidatePath("/admin/roles-analytics-cities", "page");
			return { type: "success", message: "Currency updated successfully!" };
		} else {
			return {
				type: "error",
				message: "Something went wrong, please try again later.",
			};
		}
	} catch (error) {
		console.error("Error updating the currency:", error);
		return {
			type: "error",
			message: "Something went wrong, please try again later.",
		};
	}
};

export default updateCurrencyInDB;
