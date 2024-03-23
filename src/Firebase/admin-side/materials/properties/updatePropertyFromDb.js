"use server";
import { db } from "@/Firebase/firebase";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

const updatePropertyFromDb = async ({
  id,
  area,
  description,
  location,
  demand,
  city,
  type,
}) => {
  try {
    // Check the previous city
    const propertyDocRef = doc(db, "PROPERTIES", id);
    const propertyDoc = await getDoc(propertyDocRef);
    if (!propertyDoc.exists()) {
      console.error("Property document does not exist.");
      return {
        type: "ERROR",
        message: "Something went wrong. Please try again.",
      };
    }
    const previousCity = propertyDoc.data().city;
    // Update the usage count of the preivous and new city document
    if (previousCity !== city) {
      const previousCityDocRef = doc(db, "CITIES", previousCity);
      const previousCityDoc = await getDoc(previousCityDocRef);
      if (!previousCityDoc.exists()) {
        console.error("Previous city document does not exist.");
        return {
          type: "ERROR",
          message: "Something went wrong. Please try again.",
        };
      } else {
        await updateDoc(previousCityDocRef, {
          [`usage.properties`]: increment(-1),
        });
      }
      const cityDocRef = doc(db, "CITIES", city);
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
    }
    // Update the property in the database
    await updateDoc(propertyDocRef, {
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
      message: "Property updated successfully.",
    };
  } catch (error) {
    console.error("Error updating the property: " + error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updatePropertyFromDb;
