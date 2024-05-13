"use server";
import { db, storage } from "@/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import getProgramById from "./getProgramById";

const getCurrentRPDesign = async designId => {
  const designDocRef = doc(db, "RP_DESIGNS", designId);
  try {
    const designDoc = await getDoc(designDocRef);
    if (designDoc.exists()) {
      const designDocData = designDoc.data();
      // Get video url
      const videoRef = ref(storage, `RP_DESIGNS/${designId}/video`);
      const video = await getDownloadURL(videoRef);
      // Get images urls
      const imagesOp1Ref = ref(
        storage,
        `RP_DESIGNS/${designId}/images/option1`,
      );
      const imagesOp2Ref = ref(
        storage,
        `RP_DESIGNS/${designId}/images/option2`,
      );
      const [imagesOp1, imagesOp2] = await Promise.all([
        getImages(imagesOp1Ref),
        getImages(imagesOp2Ref),
      ]);
      const programsPromises = designDocData.programs?.map(async programId => {
        return await getProgramById(programId);
      });
      const exteriorViewsPromises = designDocData.exteriorViews?.map(
        async viewId => {
          return await getView(viewId);
        },
      );
      const interiorViewsPromises = designDocData.interiorViews?.map(
        async viewId => {
          return await getView(viewId);
        },
      );
      const programs = await Promise.all(programsPromises || []);
      const exteriorViews = await Promise.all(exteriorViewsPromises || []);
      const interiorViews = await Promise.all(interiorViewsPromises || []);

      const designData = {
        video,
        designCost: designDocData.designCost,
        constructionCost: designDocData.constructionCost,
        keywords: designDocData.keywords,
        op1Name: designDocData.op1Name,
        op2Name: designDocData.op2Name,
        imagesOp1,
        imagesOp2,
        programs,
        description: designDocData.description,
        descriptionOp1: designDocData.descriptionOp1,
        descriptionOp2: designDocData.descriptionOp2,
        exteriorViews,
        interiorViews,
        materials: designDocData.materials,
        designRates: designDocData.designRates,
        constructionRates: designDocData.constructionRates,
        discount: designDocData.discount,
        totalCost: designDocData.totalCost,
      };
      return designData;
    } else {
      console.error("Design not found:", error);
      throw new Error("An error occured. Please try again.");
    }
  } catch (error) {
    console.error("Error getting design:", error);
    throw new Error("An error occured. Please try again.");
  }
};

const getImages = async imagesRef => {
  const imageUrls = [];
  const result = await listAll(imagesRef);
  await Promise.all(
    result.items?.map(async imageRef => {
      const imageUrl = await getDownloadURL(imageRef);
      imageUrls.push(imageUrl);
    }),
  );
  return imageUrls;
};

const getView = async viewId => {
  const viewDocRef = doc(db, "VIEWS", viewId);
  const videoRef = ref(storage, `VIEWS/${viewId}`);
  const videoUrl = await getDownloadURL(videoRef);
  const viewDoc = await getDoc(viewDocRef);
  const viewDocData = viewDoc.data();
  return {
    id: viewId,
    name: viewDocData.name,
    description: viewDocData.description,
    option: viewDocData.option,
    video: videoUrl,
    isUploaded: true,
  };
};

export default getCurrentRPDesign;
