"use server";
import { db } from "@/Firebase/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

const addNewProductRate = async ({
  service,
  rate,
  description,
  isFixed,
  type,
}) => {
  const productRateCollectionRef = collection(db, "PRODUCT_RATES");
  try {
    const queryResult = query(
      productRateCollectionRef,
      where("service", "==", service),
    );
    const querySnapshot = await getDocs(queryResult);
    if (!querySnapshot.empty) {
      return {
        type: "ERROR",
        message: "Service with this name already exists.",
      };
    }
    if (isFixed) {
      // un-fix the previous fixed rate if any
      const fixedQuery = query(
        productRateCollectionRef,
        where("isFixed", "==", true),
      );
      const fixedQuerySnapshot = await getDocs(fixedQuery);

      if (!fixedQuerySnapshot.empty) {
        const previousFixedDoc = fixedQuerySnapshot.docs[0];
        await updateDoc(previousFixedDoc.ref, { isFixed: false });
      }
    }
    await addDoc(productRateCollectionRef, {
      service: service,
      rate,
      description: description,
      isFixed,
      type,
    });
    revalidatePath("/admin/product-rates", "page");
    return { type: "SUCCESS", message: "Product rate added successfully" };
  } catch (error) {
    console.error("Error adding product rate: ", error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default addNewProductRate;
