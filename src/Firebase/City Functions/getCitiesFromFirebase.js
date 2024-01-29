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
          const city = {
            id: doc.id,
            name: doc.data().name,
          };
          arr.push(city);
        });

        setCities(arr);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, [setCities]);
};

export default useCitiesFromDB;
