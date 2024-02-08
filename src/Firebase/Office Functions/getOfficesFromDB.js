import { collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const useOfficesFromDB = async () => {
  const officeRef = collection(db, "Office");
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      officeRef,
      (dataQuery) => {
        const arr = [];
        const promises = [];

        dataQuery.forEach((doc) => {
          const officeData = {
            id: doc.id,
            address: doc.data().address,
            city: doc.data().city,
            mapsLink: doc.data()?.mapsLink,
          };
          arr.push(officeData);

          const imageName = `${doc.id}`;

          const imageRef = ref(storage, `Office/${imageName}`);

          promises.push(
            getDownloadURL(imageRef).then((url) => {
              officeData.image = url;
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

export default useOfficesFromDB;
