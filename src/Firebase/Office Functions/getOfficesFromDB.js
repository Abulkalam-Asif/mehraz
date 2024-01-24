import {useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useOfficesFromDB = (currencies, setCurrencies) => {
	const ref = collection(db, "Office");

	useEffect(() => {
		const fetchData = () => {
			const arr = [];
			const unsubscribe = onSnapshot(ref, (dataQuery) => {
				dataQuery.forEach((doc) => {
					const DocData = {
						id: doc.id,
						address: doc.data().address,
						city: doc.data().city,
						mapsLink: doc.data().mapsLink,
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

export default useOfficesFromDB;
