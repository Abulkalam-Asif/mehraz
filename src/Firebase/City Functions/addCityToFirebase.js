"use server";
import { revalidatePath } from "next/cache";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const addCityToDB = async ({ name, usage }) => {
  const ref = collection(db, "City");
  // TODO: Add a check to see if the city already exists
  try {
    await addDoc(ref, {
      name,
      usage,
    });
    revalidatePath("/admin/roles-analytics-cities", "page");
    return { type: "success", message: "City added successfully!" };
  } catch (err) {
    console.error("Error adding the city: " + err);
    return {
      type: "error",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default addCityToDB;
