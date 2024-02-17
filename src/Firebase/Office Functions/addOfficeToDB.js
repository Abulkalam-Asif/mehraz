"use server";
import { db, storage } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { revalidatePath } from "next/cache";

const addOfficeToDB = async ({ name, address, mapsLink, image }) => {
  try {
    const currentTimeInMilliseconds = new Date().getTime().toString();

    const imageRef = ref(storage, `Offices/${currentTimeInMilliseconds}`);
    await uploadBytes(imageRef, image.get("image"));

    const collectionRef = collection(db, "Office");
    const newDocRef = doc(collectionRef, currentTimeInMilliseconds);

    await setDoc(newDocRef, {
      name: name,
      address: address,
      mapsLink: mapsLink,
    });

    revalidatePath("/admin/roles-analytics-cities", "page");
    return {
      type: "success",
      message: "Office added successfully!",
    };
  } catch (err) {
    console.error("Error adding the office: " + err);
    return {
      type: "error",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default addOfficeToDB;
