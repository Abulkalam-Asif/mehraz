"use server";
import { db } from "@/Firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const updateBudgetRanges = async budgetRanges => {
  const budgetRangesCollection = collection(db, "BUDGET_RANGES");
  try {
    const promises = [];
    promises.push(
      budgetRanges?.map(async budgetRange => {
        const budgetRangeDocRef = doc(budgetRangesCollection, budgetRange.id);
        await setDoc(budgetRangeDocRef, {
          min: budgetRange.min,
          max: budgetRange.max,
        });
      }),
    );
    await Promise.all(promises || []);
    return {
      type: "SUCCESS",
      message: "Budget ranges updated successfully.",
    };
  } catch (error) {
    console.error("Error updating budget ranges: ", error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updateBudgetRanges;
