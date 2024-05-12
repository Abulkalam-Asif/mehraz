"use server";
import { db } from "@/Firebase/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

export const getRPScreen2SideData = async projectId => {
  const rpCollectionRef = collection(db, "READY_PROJECTS");
  const projectDocRef = doc(rpCollectionRef, projectId);
  try {
    const projectDoc = await getDoc(projectDocRef);
    if (projectDoc.exists()) {
      const projectSideData = {
        areas: projectDoc.data().areas,
        floors: projectDoc.data().floors,
      };
      return projectSideData;
    } else {
      console.error("Error getting screen 2 data. Document not found");
      throw new Error("An error occurred. Please try again.");
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw new Error("An error occurred. Please try again.");
  }
};
