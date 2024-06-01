"use server";
import { db, storage } from "@/Firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { revalidatePath } from "next/cache";

const addStyleToDB = async ({ name, budget, image, usage }) => {
  try {
    //checking Uniqueness
    const refer = collection(db, "STYLES");

    const queryResult = query(refer, where("name", "==", name));

    const querySnapshot = await getDocs(queryResult);

    if (!querySnapshot.empty) {
      return { type: "ERROR", message: "STYLE with this name already exists." };
    }

    const currentTimeInMilliseconds = new Date().getTime().toString();

    const imageRef = ref(storage, `STYLES/${currentTimeInMilliseconds}`);
    await uploadBytes(imageRef, image.get("image"));

    const collectionRef = collection(db, "STYLES");
    const newDocRef = doc(collectionRef, currentTimeInMilliseconds);

    await setDoc(newDocRef, {
      name,
      budget,
      usage,
    });

    revalidatePath("/admin/roles-analytics-cities", "page");
    return {
      type: "SUCCESS",
      message: "Style added successfully!",
    };
  } catch (error) {
    console.error("Error adding the style: " + error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default addStyleToDB;
