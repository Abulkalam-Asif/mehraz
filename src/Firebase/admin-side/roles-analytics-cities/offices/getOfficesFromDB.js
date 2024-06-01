"use server";
import { db, storage } from "@/Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

const getOfficesFromDB = async (
  fields = ["id", "name", "address", "mapsLink", "image"],
) => {
  const officesRef = collection(db, "OFFICES");
  const offices = [];
  const promises = [];
  try {
    const officesDocs = await getDocs(officesRef);
    officesDocs.forEach(doc => {
      const data = doc.data();
      const officeData = {};
      fields.forEach(field => {
        if (field === "id") {
          officeData[field] = doc.id;
          return;
        } else if (field === "image") {
          const imageRef = ref(storage, `OFFICES/${doc.id}`);
          promises.push(
            getDownloadURL(imageRef).then(url => {
              officeData.image = url;
            }),
          );
        } else {
          officeData[field] = data[field];
        }
      });
      offices.push(officeData);
    });
    await Promise.all(promises);
    return offices;
  } catch (error) {
    console.error("Error getting offices: ", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};

export default getOfficesFromDB;
