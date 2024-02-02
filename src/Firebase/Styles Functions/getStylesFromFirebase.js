import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const useStylesFromDB = (setStyles) => {
  useEffect(() => {
    const fetchData = async () => {
      
      const unsubscribe = onSnapshot(collection(db, "Style"), (dataQuery) => {
        const arr = [];
        const promises = [];

        dataQuery.forEach((doc) => {
          const stylesData = {
            id: doc.id,
            name: doc.data().name,
          };
          arr.push(stylesData);

          const imageName = `${doc.id}`;

          const imageRef = ref(storage, `Style/${imageName}`);

          promises.push(
            getDownloadURL(imageRef).then((url) => {
              stylesData.image = url;
            })
          );
        });

        Promise.all(promises).then(() => {
          setStyles(arr);
        });
      });

      return () => unsubscribe();
    };

    fetchData();
  }, [setStyles]);
};

export default useStylesFromDB;
