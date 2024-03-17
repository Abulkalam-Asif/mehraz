import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

const usePlotsFromDB = async () => {
  const ref = collection(db, "PLOTS");
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      ref,
      (dataQuery) => {
        const arr = [];
        dataQuery.forEach((doc) => {
          const docData = {
            id: doc.id,
            area: doc.data().area,
            unit: doc.data().unit,
            category: doc.data().category,
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
};

export default usePlotsFromDB;
