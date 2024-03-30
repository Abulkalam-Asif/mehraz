import { collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const useStylesFromDB = async (fields = ["id", "name", "budget"]) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      collection(db, "STYLES"),
      dataQuery => {
        const arr = [];
        const promises = [];

        dataQuery.forEach(doc => {
          const stylesData = {};
          fields.forEach(field => {
            if (field === "id") {
              stylesData[field] = doc.id;
            } else if (field === "image") {
              const imageName = `${doc.id}`;
              const imageRef = ref(storage, `STYLES/${imageName}`);
              promises.push(
                getDownloadURL(imageRef).then(url => {
                  stylesData[field] = url;
                }),
              );
            } else {
              stylesData[field] = doc.data()[field];
            }
          });
          arr.push(stylesData);
        });
        unsubscribe();
        Promise.all(promises).then(() => {
          resolve(arr);
        });
      },
      error => {
        unsubscribe();
        reject(error);
      },
    );
  });
};

export default useStylesFromDB;
