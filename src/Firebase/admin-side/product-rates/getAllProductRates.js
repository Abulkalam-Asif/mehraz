"use server";
import { db } from "@/Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const getAllProductRates = async () => {
  const productRatesCollection = collection(db, "PRODUCT_RATES");
  try {
    const productRateDocs = await getDocs(productRatesCollection);
    let productRates = [];
    if (productRateDocs.empty) {
      return [];
    } else {
      productRateDocs.forEach(doc => {
        productRates.push({
          id: doc.id,
          service: doc.data().service,
          rate: doc.data().rate,
          description: doc.data().description,
          type: doc.data().type,
          isFixed: doc.data().isFixed,
        });
      });
    }
    return productRates;
  } catch (error) {
    console.error("Error getting product rates: ", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};

export default getAllProductRates;
