"use server";
import { db } from "@/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const getUploadedDesigns = async projectId => {
  const projectDocRef = doc(db, "READY_PROJECTS", projectId);
  try {
    const projectDoc = await getDoc(projectDocRef);
    if (!projectDoc.exists()) {
      console.error("Project document not found.");
      throw new Error("An error occurred. Please try again.");
    }
    const projectData = projectDoc.data();
    return projectData?.uploadedDesigns || [];
  } catch (error) {
    console.error("Error getting product rates: ", error);
    throw new Error("An error occurred. Please try again.");
  }
};

export default getUploadedDesigns;
