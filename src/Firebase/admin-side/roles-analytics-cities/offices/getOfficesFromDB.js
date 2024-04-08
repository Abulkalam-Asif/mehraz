import { collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const getOfficesFromDB = async (
  fields = ["id", "name", "address", "mapsLink", "image"],
) => {
  const officeRef = collection(db, "OFFICES");
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      officeRef,
      dataQuery => {
        const arr = [];
        const promises = [];

        dataQuery.forEach(doc => {
          const data = doc.data();
          const officeData = {};
          fields.forEach(field => {
            if (field === "id") {
              officeData[field] = doc.id;
              return;
            } else if (field !== "image") {
              officeData[field] = data[field];
            }
          });
          if (fields.includes("image")) {
            const imageRef = ref(storage, `OFFICES/${doc.id}`);
            promises.push(
              getDownloadURL(imageRef).then(url => {
                officeData.image = url;
              }),
            );
          }
          arr.push(officeData);
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

export default getOfficesFromDB;
