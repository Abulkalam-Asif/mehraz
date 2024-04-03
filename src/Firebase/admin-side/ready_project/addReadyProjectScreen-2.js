"use server";
import { db } from "@/Firebase/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const addReadyProjectS2ToDB = async ({ id, designs, budgetRanges }) => {
  try {
    const readyProjectsRef = collection(db, "READY_PROJECTS");

    const readyProjectDocRef = doc(readyProjectsRef, id);

    const docSnapshot = await getDoc(readyProjectDocRef);
    if (!docSnapshot.exists()) {
      console.error("No document found!");
      return {
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }

    await setDoc(readyProjectDocRef, {
      designs,
      budgetRanges,
    });

    return {
      type: "SUCCESS",
      message: "Ready project screen 2 added successfully!",
    };
  } catch (error) {
    console.error("Error adding the ready project: ", error.message);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default addReadyProjectS2ToDB;
