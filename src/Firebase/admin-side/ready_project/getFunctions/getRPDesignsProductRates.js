"use server";
import { db } from "@/Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const getRPDesignsProductRates = async () => {
  try {
    const productRatesRef = collection(db, "PRODUCT_RATES");
    const productRatesSnapshot = await getDocs(productRatesRef);
    if (productRatesSnapshot.empty) {
      return [];
    }
    return productRatesSnapshot.docs.map(doc => ({
      id: doc.id,
      service: doc.data().service,
      type: doc.data().type,
      rate: doc.data().rate,
    }));
  } catch (error) {
    console.error("Error getting product rates: ", error);
    throw new Error("An error occurred. Please try again.");
  }
};

export default getRPDesignsProductRates;
