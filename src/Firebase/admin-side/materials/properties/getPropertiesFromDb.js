"use server";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/Firebase/firebase";

const getPropertiesFromDb = async (
  fields = ["id", "area", "description", "location", "demand", "city", "type"],
) => {
  const propertiesRef = collection(db, "PROPERTIES");
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      propertiesRef,
      dataQuery => {
        const arr = [];

        dataQuery.forEach(doc => {
          const propertyData = {};
          fields.forEach(field => {
            if (field === "id") {
              propertyData[field] = doc.id;
            } else {
              propertyData[field] = doc.data()[field];
            }
          });
          arr.push(propertyData);
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

export default getPropertiesFromDb;
