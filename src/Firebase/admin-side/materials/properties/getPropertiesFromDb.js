import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

const usePropertiesFromDb = async () => {
  const propertiesRef = collection(db, "PROPERTIES");
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      propertiesRef,
      dataQuery => {
        const arr = [];

        dataQuery.forEach(doc => {
          const property = {
            id: doc.id,
            area: doc.data().area,
            description: doc.data().description,
            location: doc.data().location,
            demand: doc.data().demand,
            city: doc.data().city,
            type: doc.data().type,
          };
          arr.push(property);
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
};

export default usePropertiesFromDb;
