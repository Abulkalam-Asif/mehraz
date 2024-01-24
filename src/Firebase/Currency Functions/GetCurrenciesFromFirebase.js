import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useCurrenciesFromDB = (currencies,setCurrencies) => {
	const ref = collection(db, "Currency");
	
	useEffect(() => {
		const fetchData = () => {
			const arr = [];
			const unsubscribe = onSnapshot(ref, (dataQuery) => {
				dataQuery.forEach((doc) => {
					const DocData = {
						id: doc.id,
						name: doc.data().name,
						cities: doc.data().cities,
						valueInPkr: doc.data().valueInPkr,
					};
					arr.push(DocData);
				});

				setCurrencies(arr);
			});

			return () => unsubscribe();
		};
		fetchData();
	}, [ref, currencies]);

};

export default useCurrenciesFromDB;
