"use server";
import { revalidatePath } from "next/cache";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

const updateCurrencyInDB = async (currentCurrency, prevCities) => {
  let { id, name, cities, valueInPkr } = currentCurrency;
  try {
    const currencyRef = doc(db, "CURRENCIES", id);
    const docSnapshot = await getDoc(currencyRef);

    const newlyAddedCities = cities.filter(
      (cityId) => !prevCities.includes(cityId)
    );

    newlyAddedCities.forEach(async (cityId) => {
      const cityRef = doc(db, "CITIES", cityId);
      await updateDoc(cityRef, {
        [`usage.currencies`]: increment(1),
      });
    });

    prevCities.forEach(async (cityId) => {
      if (!cities.includes(cityId)) {
        const cityRef = doc(db, "CITIES", cityId);
        await updateDoc(cityRef, {
          [`usage.currencies`]: increment(-1),
        });
      }
    });

    if (docSnapshot.exists()) {
      await updateDoc(currencyRef, {
        name: name,
        valueInPkr: valueInPkr,
        cities: cities,
        usage: docSnapshot.data().usage,
      });

      revalidatePath("/admin/roles-analytics-cities", "page");
      return { type: "success", message: "Currency updated successfully!" };
    } else {
      return {
        type: "error",
        message: "Something went wrong, please try again later.",
      };
    }
  } catch (error) {
    console.error("Error updating the currency:", error);
    return {
      type: "error",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updateCurrencyInDB;
