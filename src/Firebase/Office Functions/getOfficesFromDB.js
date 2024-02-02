import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const useOfficesFromDB = (offices, setOffices) => {
  useEffect(() => {
    const fetchData = async () => {
      
      const unsubscribe = onSnapshot(collection(db, "Office"), (dataQuery) => {
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

        Promise.all(promises).then(() => {
          setOffices(arr);
        });
      });

      return () => unsubscribe();
    };

    fetchData();
  }, [setOffices]);
};

export default useOfficesFromDB;
