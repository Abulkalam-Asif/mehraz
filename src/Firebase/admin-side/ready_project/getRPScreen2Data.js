"use server";
import { db } from "@/Firebase/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

export const getRPScreen2Data = async projectId => {
  const projectDocRef = doc(collection(db, "READY_PROJECTS"), projectId);
  try {
    const projectDoc = await getDoc(projectDocRef);
    if (projectDoc.exists()) {
      const designIds = projectDoc.data().designs;
      const combinations = await Promise.all(
        designIds.map(async designId => {
          console.log(designId);
          const designDocRef = doc(collection(db, "RP_DESIGNS"), designId);
          const designDoc = await getDoc(designDocRef);
          console.log(designDoc.data());
          if (designDoc.exists()) {
            return {
              areaId: designDoc.data().areaId,
              floorId: designDoc.data().floorId,
              familyUnitId: designDoc.data().familyUnitId,
            };
          } else {
            throw new Error("An error occurred. Please try again.");
          }
        }),
      );
      const projectData = {
        areas: projectDoc.data().areas,
        floors: projectDoc.data().floors,
        budgetRanges: projectDoc.data().budgetRanges,
        combinations,
      };
      return projectData;
    }
    throw new Error("An error occurred. Please try again.");
  } catch (error) {
    console.log("Error getting document:", error);
    throw new Error("An error occurred. Please try again.");
  }
};
