"use server";
import { db, storage } from "@/Firebase/firebase"; 
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; 

const addReadyProjectS2ToDB = async ({ project_id, designs, budgetRange }) => {
  try {
    const readyProjectsRef = collection(db, "READY_PROJECTS");

    const readyProjectDocRef = doc(readyProjectsRef, project_id);

    const docSnapshot = await getDoc(readyProjectDocRef);
    if (!docSnapshot.exists()) {
      return {
        data: null,
        type: "ERROR",
        message: "A project with this ID does not exist.",
      };
    }

    const response=await setDoc(readyProjectDocRef, {
      designs: designs,
      budgetRange: budgetRange,
    });
 
    return {
      type: "SUCCESS",
      message: "Ready project screen 1 added successfully!",
    };
  } catch (error) {
    console.error("Error adding the ready project: ", error.message);
    return {
      data: null,
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default addReadyProjectS2ToDB;
