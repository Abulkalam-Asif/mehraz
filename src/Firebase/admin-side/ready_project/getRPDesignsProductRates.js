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
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting product rates: ", error);
    return [];
  }
};

export default getRPDesignsProductRates;
