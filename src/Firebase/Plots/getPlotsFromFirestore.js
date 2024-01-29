import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const usePlotsFromDB = (setPlots) => {
  const ref = collection(db, "Plot");

  useEffect(() => {
    const fetchData = () => {
      const arr = [];
      const unsubscribe = onSnapshot(ref, (dataQuery) => {
        dataQuery.forEach((doc) => {
          const docData = {
            id: doc.id,
            area: doc.data().area,
            unit: doc.data().unit,
            usage: doc.data().usage,
          };
          arr.push(docData);
        });

        setPlots(arr);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, [setPlots]);
};

export default usePlotsFromDB;
