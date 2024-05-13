"use server";
import { db } from "@/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getRPUploadedScreensCount = async projectId => {
  const projectDocRef = doc(db, "READY_PROJECTS", projectId);
  try {
    const projectData = await getDoc(projectDocRef);
    if (projectData.exists()) {
      return projectData?.data()?.uploadedScreensCount || null;
    }
    return null;
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
};
