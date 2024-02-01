import { db } from "../firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

const updateCurrencyInDB = async (currentCurrency, prevCities) => {
	let { id, name, cities, valueInPkr } = currentCurrency;
	try {
		const currencyRef = doc(db, "Currency", id);
		const docSnapshot = await getDoc(currencyRef);

		const newlyAddedCities = cities.filter(
			(cityId) => !prevCities.includes(cityId)
		);

		newlyAddedCities.forEach(async (cityId) => {
			const cityRef = doc(db, "City", cityId);
			await updateDoc(cityRef, {
				[`usage.currencies`]: increment(1),
			});
		});

		prevCities.forEach(async (cityId) => {
			if (!cities.includes(cityId)) {
				const cityRef = doc(db, "City", cityId);
				await updateDoc(cityRef, {
					[`usage.currencies`]: increment(-1),
				});
			}
		});

		if (docSnapshot.exists()) {
			await updateDoc(currencyRef, {
				name: name,
				valueInPkr: valueInPkr,
				cities: cities,
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

export default updateCurrencyInDB;
