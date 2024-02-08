"use server";
import { db } from "../firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

const deleteCityFromDB = async (id) => {
  try {
    const cityRef = doc(db, "City", id);
    const docSnapshot = await getDoc(cityRef);

    if (docSnapshot.exists()) {
      let usage = docSnapshot.data().usage;
      if (usage.currencies !== 0 || usage.projects !== 0) {
        return "Usage is not zero. Deletion failed.";
      }

      await deleteDoc(cityRef);

      return "Document deleted successfully.";
    } else {
      return "Document does not exist. Deletion failed.";
    }
  } catch (error) {
    return "Error deleting document: " + error.message;
  }
};

export default deleteCityFromDB;
