"use server";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

const addCurrencyToDB = async ({ name, valueInPkr, cities, usage }) => {
  const ref = collection(db, "Currency");

  cities.map(async (id) => {
    const cityRef = doc(db, "City", id);
    await updateDoc(cityRef, {
      [`usage.currencies`]: increment(1),
    });
  });

  return addDoc(ref, {
    name,
    valueInPkr,
    cities,
    usage,
  }).catch((err) => {
    console.error("Firebase Error: " + err);
  });
};

export default addCurrencyToDB;
