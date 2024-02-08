"use server";
import { db, storage } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const addOfficeToDB = async ({ city, address, mapsLink, image }) => {
  try {
    const currentTimeInMilliseconds = new Date().getTime().toString();
    if (image === null) {
      throw new Error("Please select an image to upload");
    }

    const imageRef = ref(storage, `Office/${currentTimeInMilliseconds}`);
    await uploadBytes(imageRef, image);

    const collectionRef = collection(db, "Office");
    const newDocRef = doc(collectionRef, currentTimeInMilliseconds);

    await setDoc(newDocRef, {
      city: city,
      address: address,
      mapsLink: mapsLink,
    });

    return Promise.resolve("Data writing and image upload successful");
  } catch (error) {
    console.error("Firebase Error: " + error.message);
    return Promise.reject("Firebase Error: " + error.message);
  }
};

export default addOfficeToDB;
