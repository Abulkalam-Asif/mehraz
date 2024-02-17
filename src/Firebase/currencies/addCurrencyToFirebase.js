"use server";
import { revalidatePath } from "next/cache";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

const addCurrencyToDB = async ({ name, valueInPkr, cities, usage }) => {
  const ref = collection(db, "CURRENCIES");

  try {
    await Promise.all(
      cities.map(async (id) => {
        const cityRef = doc(db, "CITIES", id);
        await updateDoc(cityRef, {
          [`usage.currencies`]: increment(1),
        });
      })
    );

    await addDoc(ref, {
      name,
      valueInPkr,
      cities,
      usage,
    });

    revalidatePath("/admin/roles-analytics-cities", "page");
    return { type: "success", message: "Currency added successfully!" };
  } catch (err) {
    console.error("Error adding the currency:", err);
    return {
      type: "error",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default addCurrencyToDB;
