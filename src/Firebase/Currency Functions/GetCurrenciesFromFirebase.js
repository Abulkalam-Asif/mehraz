import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useCurrenciesFromDB = (setCurrencies, cities) => {
	const ref = collection(db, "Currency");

	useEffect(() => {
		const fetchData = () => {
			const unsubscribe = onSnapshot(ref, (dataQuery) => {
				const arr = [];

				dataQuery.forEach((doc) => {
					const docData = {
						id: doc.id,
						name: doc.data().name,
						cities: mapCitiesWithNames(doc.data().cities, cities),
						valueInPkr: doc.data().valueInPkr,
					};
					arr.push(docData);
				});
				setCurrencies(arr);
			});

			return () => unsubscribe();
		};

		fetchData();
	}, [setCurrencies, cities]);

	const mapCitiesWithNames = (cityIds, citiesData) => {
		return cityIds.map((cityId) => {
			const city = citiesData
				? citiesData.find((city) => city.id === cityId)
				: null;
			return {
				id: cityId,
				name: city ? city.name : "Unknown City",
			};
		});
	};
};

export default useCurrenciesFromDB;
