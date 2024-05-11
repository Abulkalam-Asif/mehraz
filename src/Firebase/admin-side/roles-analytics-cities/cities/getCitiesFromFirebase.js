"use server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/firebase";

const getCitiesFromDB = async (fields = ["id", "name"]) => {
  const citiesRef = collection(db, "CITIES");
  const cities = [];
  try {
    const citiesDocs = await getDocs(citiesRef);
    citiesDocs.forEach(doc => {
      const data = doc.data();
      const docData = {};
      fields.forEach(field => {
        if (field === "id") {
          docData[field] = doc.id;
          return;
        }
        docData[field] = data[field];
      });
      cities.push(docData);
    });
    return cities;
  } catch (error) {
    console.error("Error fetching cities from DB:", error);
    throw new Error("An error occurred. Please try again.");
  }
};

export default getCitiesFromDB;
