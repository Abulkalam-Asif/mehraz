"use server";
import { db } from "@/Firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

const deleteProductRate = async id => {
  try {
    const docRef = doc(db, "PRODUCT_RATES", id);
    await deleteDoc(docRef);
    revalidatePath("/admin/product-rates", "page");
    return { type: "SUCCESS", message: "Product rate deleted successfully" };
  } catch (error) {
    console.error("Error deleting the product rate:", error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default deleteProductRate;
