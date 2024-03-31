"use server";
import { collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const useMaterialsFromDb = async (
  fields = [
    "id",
    "name",
    "vendor",
    "rate",
    "category",
    "description",
    "specs",
    "orderedAs",
    "image1",
    "image2",
  ],
) => {
  const materialsRef = collection(db, "MATERIALS");
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      materialsRef,
      dataQuery => {
        const arr = [];
        const promises = [];

        dataQuery.forEach(doc => {
          const materialData = {};
          fields.forEach(field => {
            if (field === "id") {
              materialData[field] = doc.id;
            } else if (field === "image1" || field === "image2") {
              const imageName = `${doc.id}/${field}`;
              const imageRef = ref(storage, `MATERIALS/${imageName}`);
              promises.push(
                getDownloadURL(imageRef).then(url => {
                  materialData[field] = url;
                }),
              );
            } else {
              materialData[field] = doc.data()[field];
            }
          });
          arr.push(materialData);
        });
        unsubscribe();
        Promise.all(promises).then(() => resolve(arr));
      },
      error => {
        unsubscribe();
        reject(error);
      },
    );
  });
};

export default useMaterialsFromDb;
