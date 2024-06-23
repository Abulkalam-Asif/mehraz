"use server";
import { db } from "@/Firebase/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";

const addReadyProjectS2ToDB = async ({ id, designs, budgetRanges }) => {
  try {
    const readyProjectsRef = collection(db, "READY_PROJECTS");

    const readyProjectDocRef = doc(readyProjectsRef, id);
  // Validation
    const docSnapshot = await getDoc(readyProjectDocRef);
    if (!docSnapshot.exists()) {
      console.error("No document found!");
      return {
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }

    // Add designs to RP_DESIGNS collection
    const rpDesignsRef = collection(db, "RP_DESIGNS");
    const rpDesignsIds = [];

    await Promise.all(
      designs.map(async design => {
        const response = await addDoc(rpDesignsRef, {
          ...design,
        });
        rpDesignsIds.push(response.id);
      }),
    );

    // Update the ready project document
    await updateDoc(readyProjectDocRef, {
      designs: rpDesignsIds,
      budgetRanges:budgetRanges,
      uploadedScreensCount: 2,
    });

    return {
      type: "SUCCESS",
      message: "Screen 2 added successfully!",
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
