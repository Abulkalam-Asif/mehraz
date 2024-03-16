import { collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const useStylesFromDB = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      collection(db, "STYLES"),
      (dataQuery) => {
        const arr = [];
        const promises = [];

        dataQuery.forEach((doc) => {
          const stylesData = {
            id: doc.id,
            name: doc.data().name,
            budget: doc.data().budget,
          };
          arr.push(stylesData);

          const imageName = `${doc.id}`;
          const imageRef = ref(storage, `STYLES/${imageName}`);
          promises.push(
            getDownloadURL(imageRef).then((url) => {
              stylesData.image = url;
            })
          );
        });
        unsubscribe();
        Promise.all(promises).then(() => {
          resolve(arr);
        });
      },
      (error) => {
        unsubscribe();
        reject(error);
      }
    );
  });
};

export default useStylesFromDB;
