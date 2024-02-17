import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useCitiesFromDB = async () => {
  const ref = collection(db, "City");
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      ref,
      (dataQuery) => {
        const arr = [];
        dataQuery.forEach((doc) => {
          const city = {
            id: doc.id,
            name: doc.data().name,
          };
          arr.push(city);
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

export default useCitiesFromDB;
