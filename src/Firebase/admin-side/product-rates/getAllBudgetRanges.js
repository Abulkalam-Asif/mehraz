"use server";
import { db } from "@/Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const getAllBudgetRanges = async () => {
  const budgetRangesCollection = collection(db, "BUDGET_RANGES");
  try {
    const budgetRangesDocs = await getDocs(budgetRangesCollection);
    let budgetRanges = [];
    if (budgetRangesDocs.empty) {
      return [];
    } else {
      budgetRangesDocs.forEach(doc => {
        budgetRanges.push({
          id: doc.id,
          min: doc.data().min,
          max: doc.data().max,
        });
      });
    }
    return budgetRanges;
  } catch (error) {
    console.error("Error getting budget ranges: ", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};

export default getAllBudgetRanges;
