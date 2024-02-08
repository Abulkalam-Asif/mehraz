import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import useCitiesFromDB from "../City Functions/getCitiesFromFirebase";

const useCurrenciesFromDB = async () => {
  const cities = await useCitiesFromDB();
  const ref = collection(db, "Currency");

  const promise = new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      ref,
      (dataQuery) => {
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
        unsubscribe();
        resolve(arr);
      },
      (error) => {
        unsubscribe();
        reject(error);
      }
    );
  });

  const mapCitiesWithNames = (cityIds, citiesData) => {
    return cityIds.map((cityId) => {
      const city = citiesData
        ? citiesData.find((city) => city.id === cityId)
        : null;
      return {
        id: cityId,
        name: city ? city.name : "Unnamed",
      };
    });
  };

  return promise;
};

export default useCurrenciesFromDB;
