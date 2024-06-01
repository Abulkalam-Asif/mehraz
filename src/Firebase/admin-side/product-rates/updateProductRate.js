"use server";
import { db } from "@/Firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

const updateProductRate = async ({
  id,
  service,
  rate,
  description,
  type,
  isFixed,
}) => {
  const productRateCollectionRef = collection(db, "PRODUCT_RATES");
  try {
    const queryResult = query(
      productRateCollectionRef,
      where("service", "==", service),
    );
    const querySnapshot = await getDocs(queryResult);
    const duplicateRate = querySnapshot.docs.some(doc => doc.id !== id);
    if (duplicateRate) {
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
    const docRef = doc(productRateCollectionRef, id);
    await updateDoc(docRef, {
      service,
      rate,
      description,
      type,
      isFixed,
    });
    revalidatePath("/admin/product-rates", "page");
    return { type: "SUCCESS", message: "Product rate updated successfully" };
  } catch (error) {
    console.error("Error updating the product rate:", error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updateProductRate;
