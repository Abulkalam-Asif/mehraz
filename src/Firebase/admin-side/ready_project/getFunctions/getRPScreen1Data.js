"use server";
import { db, storage } from "@/Firebase/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export const getScreen1Data = async projectId => {
  const projectDocRef = doc(collection(db, "READY_PROJECTS"), projectId);
  const imageRef = ref(storage, `READY_PROJECTS/${projectId}/image`);
  const videoRef = ref(storage, `READY_PROJECTS/${projectId}/video`);
  try {
    const image = await getDownloadURL(imageRef);
    const video = await getDownloadURL(videoRef);
    const projectDoc = await getDoc(projectDocRef);
    if (projectDoc.exists()) {
      const {
        title,
        budget,
        description,
        cities,
        areas,
        floors,
        units,
        style,
        constructionRates,
        productRates,
        keywords,
      } = projectDoc.data();
      const projectData = {
        id: projectDoc.id,
        title,
        budget,
        description,
        cities,
        areas,
        floors,
        units,
        style,
        constructionRates,
        productRates,
        keywords,
        image,
        video,
      };
      return projectData;
    }
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  } catch (error) {
    console.error("Error getting document:", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};
