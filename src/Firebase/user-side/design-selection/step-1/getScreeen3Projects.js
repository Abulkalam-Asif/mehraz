"use server";
import getStyleById from "@/Firebase/admin-side/roles-analytics-cities/styles/getStyleById";
import { db, storage } from "@/Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

const getScreeen3Projects = async () => {
  const readyProjectCollectionRef = collection(db, "READY_PROJECTS");
  const projects = [];
  try {
    const readyProjectDocs = await getDocs(readyProjectCollectionRef);
    for (const readyProjectDoc of readyProjectDocs.docs) {
      if (
        readyProjectDoc.exists() &&
        readyProjectDoc.data()?.uploadedScreensCount === 4
      ) {
        const projectId = readyProjectDoc.id;
        const styleId = readyProjectDoc.data().style;
        const style = {
          id: styleId,
          ...(await getStyleById(styleId, ["name", "budget"])),
        };
        // Getting images and videos
        const imageRef = ref(storage, `READY_PROJECTS/${projectId}/image`);
        const imageUrl = await getDownloadURL(imageRef);
        const videoRef = ref(storage, `READY_PROJECTS/${projectId}/video`);
        const videoUrl = await getDownloadURL(videoRef);

        const projectData = {
          id: projectId,
          style,
          description: readyProjectDoc.data().description,
          productRates: readyProjectDoc.data().productRates,
          constructionRates: readyProjectDoc.data().constructionRates,
          image: imageUrl,
          video: videoUrl,
        };
        projects.push(projectData);
      }
    }
    return projects;
  } catch (error) {
    console.error("Error getting the project data for preview: ", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};

export default getScreeen3Projects;
