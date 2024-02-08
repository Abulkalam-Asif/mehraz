"use server";
import { db, storage } from "../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const deleteOfficeFromDB = async (officeId) => {
  try {
    const docRef = doc(db, "Office", officeId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await deleteDoc(docRef);

      const imageRef = ref(storage, `Office/${officeId}`);
      await deleteObject(imageRef);

      return Promise.resolve(
        "Office data and associated image deleted successfully"
      );
    } else {
      return Promise.reject(`Document with ID ${officeId} does not exist`);
    }
  } catch (error) {
    console.error("Firebase Error: " + error.message);
    return Promise.reject("Firebase Error: " + error.message);
  }
};

export default deleteOfficeFromDB;
