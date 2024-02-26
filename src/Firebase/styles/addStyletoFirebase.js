"use server";
import { db, storage } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { revalidatePath } from "next/cache";

const addStyleToDB = async ({ name, budget, image, usage }) => {
  try {
    const currentTimeInMilliseconds = new Date().getTime().toString();

    const imageRef = ref(storage, `Styles/${currentTimeInMilliseconds}`);
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
      type: "success",
      message: "Style added successfully!",
    };
  } catch (error) {
    console.error("Error adding the style: " + error);
    return {
      type: "error",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default addStyleToDB;
