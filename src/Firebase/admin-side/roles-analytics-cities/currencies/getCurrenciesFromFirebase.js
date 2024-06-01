"use server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/firebase";

const getCurrenciesFromDB = async (
  fields = ["id", "name", "cities", "valueInPkr"],
) => {
  const currenciesRef = collection(db, "CURRENCIES");
  const currencies = [];
  try {
    const currenciesDocs = await getDocs(currenciesRef);
    currenciesDocs.forEach(doc => {
      const data = doc.data();
      const docData = {};
      fields.forEach(field => {
        if (field === "id") {
          docData[field] = doc.id;
          return;
        }
        docData[field] = data[field];
      });
      currencies.push(docData);
    });
    return currencies;
  } catch (error) {
    console.error("Error getting currencies: ", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};

export default getCurrenciesFromDB;
