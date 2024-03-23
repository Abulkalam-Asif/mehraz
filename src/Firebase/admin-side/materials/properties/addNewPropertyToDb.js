"use server";
import { db } from "@/Firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

const addNewPropertyToDb = async ({
  area,
  description,
  location,
  demand,
  city,
  type,
}) => {
  try {
    // Update the usage count of the city document
    const cityDocRef = doc(collection(db, "CITIES"), city);
    const cityDoc = await getDoc(cityDocRef);
    if (!cityDoc.exists()) {
      console.error("City document does not exist.");
      return {
        type: "ERROR",
        message: "Something went wrong. Please try again.",
      };
    } else {
      await updateDoc(cityDocRef, {
        [`usage.properties`]: increment(1),
      });
    }

    // Adding the new property to the database
    const propertiesCollectionRef = collection(db, "PROPERTIES");
    const newDocRef = doc(propertiesCollectionRef);
    await setDoc(newDocRef, {
      area,
      description,
      location,
      demand,
      city,
      type,
    });
    revalidatePath("/admin/materials", "page");
    return {
      type: "SUCCESS",
      message: "Property added successfully.",
    };
  } catch (error) {
    console.error("Error adding the property: " + error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default addNewPropertyToDb;
