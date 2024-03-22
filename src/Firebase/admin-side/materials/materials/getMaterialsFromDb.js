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
            displayCover: doc.data().displayCover,
            specs: doc.data().specs,
            orderedAs: doc.data().orderedAs,
          };
          const imageRef = ref(storage, `MATERIALS/${doc.id}/image`);
          const coverRef = ref(storage, `MATERIALS/${doc.id}/cover`);
          promises.push(
            getDownloadURL(imageRef).then(url => (material.image = url)),
            getDownloadURL(coverRef).then(url => (material.cover = url)),
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
