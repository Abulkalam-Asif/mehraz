"use server";
import { db, storage } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { revalidatePath } from "next/cache";

const addStyleToDB = async ({ name, image, usage }) => {
  try {
    const currentTimeInMilliseconds = new Date().getTime().toString();

    const imageRef = ref(storage, `Style/${currentTimeInMilliseconds}`);
    await uploadBytes(imageRef, image.get("image"));

    const collectionRef = collection(db, "Style");
    const newDocRef = doc(collectionRef, currentTimeInMilliseconds);

    await setDoc(newDocRef, {
      name,
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
