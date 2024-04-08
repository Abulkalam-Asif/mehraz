import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

const getCurrenciesFromDB = async (
  fields = ["id", "name", "cities", "valueInPkr"],
) => {
  const ref = collection(db, "CURRENCIES");

  const promise = new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      ref,
      dataQuery => {
        const arr = [];
        dataQuery.forEach(doc => {
          const data = doc.data();
          const docData = {};
          fields.forEach(field => {
            if (field === "id") {
              docData[field] = doc.id;
              return;
            }
            docData[field] = data[field];
          });
          arr.push(docData);
        });
        unsubscribe();
        resolve(arr);
      },
      error => {
        unsubscribe();
        reject(error);
      },
    );
  });

  return promise;
};

export default getCurrenciesFromDB;
