"use server";
import { db } from "@/Firebase/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

export const getRPScreen2Data = async projectId => {
  const projectDocRef = doc(collection(db, "READY_PROJECTS"), projectId);
  try {
    const projectDoc = await getDoc(projectDocRef);
    if (projectDoc.exists()) {
      const designIds = projectDoc.data().designs;
      const combinationsMap = new Map();
      await Promise.all(
        designIds.map(async designId => {
          const designDocRef = doc(collection(db, "RP_DESIGNS"), designId);
          const designDoc = await getDoc(designDocRef);
          if (designDoc.exists()) {
            const { areaId, floorId, familyUnitId } = designDoc.data();
            const combinationKey = `${areaId}_${floorId}`;
            if (combinationsMap.has(combinationKey)) {
              combinationsMap
                .get(combinationKey)
                .familyUnitIds.push(familyUnitId);
            } else {
              combinationsMap.set(combinationKey, {
                areaId,
                floorId,
                familyUnitIds: [familyUnitId],
              });
            }
          } else {
            console.error("Error getting screen 2 data. Design not found");
            throw new Error("An error occurred. Please try again.");
          }
        }),
      );
      const combinations = Array.from(combinationsMap.values());
      const projectData = {
        areas: projectDoc.data().areas,
        floors: projectDoc.data().floors,
        budgetRanges: projectDoc.data().budgetRanges,
        combinations,
      };
      return projectData;
    } else {
      console.error("Error getting screen 2 data. Document not found");
      throw new Error("An error occurred. Please try again.");
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw new Error("An error occurred. Please try again.");
  }
};
