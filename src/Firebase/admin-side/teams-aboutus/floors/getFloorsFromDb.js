import { db } from "@/Firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const useGetFloorsFromDb = async (fields = ["id", "name"]) => {
  const floorsRef = collection(db, "FLOORS");
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      floorsRef,
      dataQuery => {
        const arr = [];
        dataQuery.forEach(doc => {
          const data = doc.data();
          const docData = {};
          fields.forEach(field => {
            if (field === "id") {
              docData[field] = doc.id;
              return;
            }
            docData[field] = data[field];
          });
          arr.push(docData);
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

export default useGetFloorsFromDb;
