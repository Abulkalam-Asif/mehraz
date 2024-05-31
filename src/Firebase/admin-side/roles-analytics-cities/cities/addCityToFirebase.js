"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/Firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";

const addCityToDB = async ({ name, usage }) => {
  const ref = collection(db, "CITIES");

  const queryResult = query(ref, where("name", "==", name));

  const querySnapshot = await getDocs(queryResult);

  if (!querySnapshot.empty) {
    return { type: "ERROR", message: "City with this name already exists." };
  }

  try {
    await addDoc(ref, {
      name,
      usage,
    });
    revalidatePath("/admin/roles-analytics-cities", "page");
    return { type: "SUCCESS", message: "City added successfully!" };
  } catch (err) {
    console.error("Error adding city: ", err);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default addCityToDB;
