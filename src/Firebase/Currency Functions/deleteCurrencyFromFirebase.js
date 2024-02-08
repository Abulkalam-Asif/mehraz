"use server";
import { db } from "../firebase";
import {
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

const deleteCurrencyFromDB = async (id) => {
  try {
    const cityRef = doc(db, "Currency", id);
    const docSnapshot = await getDoc(cityRef);

    if (docSnapshot.exists()) {
      let cities = docSnapshot.data().cities;

      cities.forEach(async (cityId) => {
        const cityRef = doc(db, "City", cityId);
        await updateDoc(cityRef, {
          [`usage.currencies`]: increment(-1),
        });
      });
      await deleteDoc(cityRef);

      return "Document deleted successfully.";
    } else {
      return "Document does not exist. Deletion failed.";
    }
  } catch (error) {
    return "Error deleting document: " + error.message;
  }
};

export default deleteCurrencyFromDB;
