import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

const useMaterialCategoriesFromDb = async () => {
  const ref = collection(db, "MATERIAL_CATEGORIES");
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      ref,
      dataQuery => {
        const arr = [];
        dataQuery.forEach(doc => {
          const materialCaterogy = {
            id: doc.id,
            name: doc.data().name,
            fixedMaterial: doc.data().fixedMaterial,
          };
          arr.push(materialCaterogy);
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

export default useMaterialCategoriesFromDb;
