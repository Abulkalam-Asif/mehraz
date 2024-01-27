import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useCitiesFromDB = (setCities) => {
  const ref = collection(db, "City");

  useEffect(() => {
    const fetchData = () => {
      const arr = [];
      const unsubscribe = onSnapshot(ref, (dataQuery) => {
        dataQuery.forEach((doc) => {
          const cityName = doc.data().city;
          arr.push(cityName);
        });

        setCities(arr);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, [setCities]);
};

export default useCitiesFromDB;
