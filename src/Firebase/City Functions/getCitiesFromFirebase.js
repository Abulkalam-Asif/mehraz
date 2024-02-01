import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useCitiesFromDB = (setCities) => {
  const ref = collection(db, "City");

  useEffect(() => {
    const fetchData = () => {
      const unsubscribe = onSnapshot(ref, (dataQuery) => {
              const arr = [];
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
