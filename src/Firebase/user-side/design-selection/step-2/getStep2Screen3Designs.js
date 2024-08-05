"use server";
import getStyleById from "@/Firebase/admin-side/roles-analytics-cities/styles/getStyleById";
import { db, storage } from "@/Firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import replaceFamilyUnitIdWithDoc from "../replaceFamilyUnitIdWithDoc";
import replaceAreaIdWithDoc from "../replaceAreaIdWithDoc";
import replaceFloorIdWithDoc from "../replaceFloorIdWithDoc";

// Note: This is a basic implementation by ChatGPT.

// TODO: Fetch the designs from RP_DESIGNS on the basis of these things.

// first priority : Description
// same : area,floors,family units,
// (budget closest to least closest)

// second priority : diff style (i.e. homes of diff projects with same area,floors,family units & description)
// (budget closest to least closest)

// third priority : same : area,floors,
// (budget closest to least closest)

// fourth : diff style (i.e. homes of diff projects with same area,floors)
// (budget closest to least closest)

// fifth : same area,
// (budget closest to least closest)

// sixth : diff style (i.e. homes of diff projects with same area)
// (budget closest to least closest)

const getStep2Screen3Designs = async (
  areaParam,
  floorParam,
  familyUnitParam,
  requirementsParam,
) => {
  const designsCollectionRef = collection(db, "RP_DESIGNS");
  const designs = [];
  try {
    const rpDesignDocs = await getDocs(designsCollectionRef);
    const rpDesignDocsData = rpDesignDocs.docs.map(doc => doc.data());
    await Promise.all(
      rpDesignDocsData.map(async doc => {
        // Getting images and videos
        const videoRef = ref(storage, `RP_DESIGNS/${doc.id}/video`);
        const videoUrl = await getDownloadURL(videoRef);
        const op1Images = await getFolderImages(
          `RP_DESIGNS/${doc.id})/images/option1`,
        );
        const op2Images = await getFolderImages(
          `RP_DESIGNS/${doc.id})/images/option2`,
        );
        
        const data = {
          id: doc.id,
          area: await replaceAreaIdWithDoc(doc.areaId),
          floors: await replaceFloorIdWithDoc(doc.floorId),
          familyUnit: await replaceFamilyUnitIdWithDoc(doc.familyUnitId),
          description: doc.description,
          descriptionOp1: doc.descriptionOp1,
          descriptionOp2: doc.descriptionOp2,
          designCost: doc.designCost,
          constructionCost: doc.constructionCost,
          video: videoUrl,
          op1Images,
          op2Images,
        };
        designs.push(data);
      }),
    );
    return designs;
  } catch (error) {
    console.error("Error getting the design data for preview: ", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};

const getFolderImages = async path => {
  const images = [];
  const option1ImagesRef = ref(storage, path);
  try {
    const option1Images = await getDownloadURL(option1ImagesRef);
    images.push(option1Images);
    return images;
  } catch (error) {
    console.error("Error getting the option1 images: ", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};

export default getStep2Screen3Designs;
