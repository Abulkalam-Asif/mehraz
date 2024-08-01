"use server";
import getStyleById from "@/Firebase/admin-side/roles-analytics-cities/styles/getStyleById";
import { db, storage } from "@/Firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

// Note: This is just a basic implementation by ChatGPT.

// TODO: Fetch the projects from READY_PROJECTS on the basis of these things.

// first priority : same : city, style, cost same

// second priority : different styles , cost same, city same

// third priority : same : style, city
// (budget closest to least closest)

// fourth : different styles ,city
// (budget closest to least closest)

// last options : different city

const getStep1Screen2Projects = async (
  categoryParam,
  cityParam,
  styleParam,
  styleCostParam,
) => {
  const readyProjectCollectionRef = collection(db, "READY_PROJECTS");
  const projects = [];
  try {
    const filterQuery = query(
      readyProjectCollectionRef,
      where("cities", "array-contains-any", [cityParam, "GENERAL"]),
    );
    const readyProjectDocs = await getDocs(filterQuery);
    for (const readyProjectDoc of readyProjectDocs.docs) {
      if (
        readyProjectDoc.exists() &&
        readyProjectDoc.data()?.uploadedScreensCount === 4
      ) {
        const projectId = readyProjectDoc.id;
        const styleId = readyProjectDoc.data().style;
        const styleData = {
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
          style: styleData,
          cities: readyProjectDoc.data().cities,
          description: readyProjectDoc.data().description,
          productRates: readyProjectDoc.data().productRates,
          constructionRates: readyProjectDoc.data().constructionRates,
          image: imageUrl,
          video: videoUrl,
        };
        projects.push(projectData);
      }
    }

    // Sorting projects based on the priorities
    projects.sort((a, b) => {
      const aStyleMatch = a.style.id === styleParam;
      const bStyleMatch = b.style.id === styleParam;
      const aStyleCostMatch = a.productRates.styleCost === styleCostParam;
      const bStyleCostMatch = b.productRates.styleCost === styleCostParam;
      const aBudgetDifference = Math.abs(a.style.budget - styleCostParam);
      const bBudgetDifference = Math.abs(b.style.budget - styleCostParam);

      if (aStyleMatch && bStyleMatch) {
        if (aStyleCostMatch && bStyleCostMatch) return 0;
        if (aStyleCostMatch) return -1;
        if (bStyleCostMatch) return 1;
        return aBudgetDifference - bBudgetDifference;
      }
      if (aStyleMatch) return -1;
      if (bStyleMatch) return 1;
      if (aStyleCostMatch && bStyleCostMatch) return 0;
      if (aStyleCostMatch) return -1;
      if (bStyleCostMatch) return 1;
      return aBudgetDifference - bBudgetDifference;
    });

    // Reordering projects to place highest priority projects in the middle
    const reorderProjects = projects => {
      const midIndex = Math.floor(projects.length / 2);
      const reordered = [];
      let left = 0,
        right = projects.length - 1;
      for (let i = 0; i <= midIndex; i++) {
        if (i % 2 === 0 && left <= midIndex) {
          reordered.unshift(projects[left++]);
        } else if (right > midIndex) {
          reordered.push(projects[right--]);
        }
      }
      return reordered;
    };

    return reorderProjects(projects);
  } catch (error) {
    console.error("Error getting the project data for preview: ", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};

export default getStep1Screen2Projects;
