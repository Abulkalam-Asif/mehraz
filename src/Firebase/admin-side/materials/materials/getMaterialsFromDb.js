"use server";
import { collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const useMaterialsFromDb = async () => {
  const materialsRef = collection(db, "MATERIALS");
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      materialsRef,
      dataQuery => {
        const arr = [];
        const promises = [];

        dataQuery.forEach(doc => {
          const material = {
            id: doc.id,
            name: doc.data().name,
            vendor: doc.data().vendor,
            rate: doc.data().rate,
            category: doc.data().category,
            description: doc.data().description,
            specs: doc.data().specs,
            orderedAs: doc.data().orderedAs,
          };
          const image1Ref = ref(storage, `MATERIALS/${doc.id}/image1`);
          const image2Ref = ref(storage, `MATERIALS/${doc.id}/image2`);
          promises.push(
            getDownloadURL(image1Ref).then(url => (material.image1 = url)),
            getDownloadURL(image2Ref).then(url => (material.image2 = url)),
          );
          arr.push(material);
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
