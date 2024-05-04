"use server";
import { db, storage } from "@/Firebase/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";

export const getRPScreen3Data = async projectId => {
  const projectDocRef = doc(collection(db, "READY_PROJECTS"), projectId);
  try {
    const projectDoc = await getDoc(projectDocRef);
    if (projectDoc.exists()) {
      const materials = projectDoc.data().materials;
      const interiorViews = projectDoc.data().interiorViews;
      const exteriorViews = projectDoc.data().exteriorViews;
      // Get the data for the interior and exterior views
      await Promise.all(
        interiorViews.map(async (viewId, index) => {
          const viewDocRef = doc(collection(db, "VIEWS"), viewId);
          const videoRef = ref(storage, `VIEWS/${viewId}`);
          const videoUrl = await getDownloadURL(videoRef);
          const viewDoc = await getDoc(viewDocRef);
          interiorViews[index] = {
            id: viewId,
            name: viewDoc.data().name,
            description: viewDoc.data().description,
            option: viewDoc.data().option,
            video: videoUrl,
            isUploaded: true,
          };
        }),
      );
      await Promise.all(
        exteriorViews.map(async (viewId, index) => {
          const viewDocRef = doc(collection(db, "VIEWS"), viewId);
          const videoRef = ref(storage, `VIEWS/${viewId}`);
          const videoUrl = await getDownloadURL(videoRef);
          const viewDoc = await getDoc(viewDocRef);
          exteriorViews[index] = {
            id: viewId,
            name: viewDoc.data().name,
            description: viewDoc.data().description,
            option: viewDoc.data().option,
            video: videoUrl,
            isUploaded: true,
          };
        }),
      );

      // Get the images of the project
      const getImages = async imagesRef => {
        const imageUrls = [];
        const result = await listAll(imagesRef);
        await Promise.all(
          result.items.map(async imageRef => {
            const imageUrl = await getDownloadURL(imageRef);
            imageUrls.push(imageUrl);
          }),
        );
        return imageUrls;
      };

      // Get the images for option1 and option2
      const op1ImagesRef = ref(
        storage,
        `READY_PROJECTS/${projectId}/images/option1/`,
      );
      const op2ImagesRef = ref(
        storage,
        `READY_PROJECTS/${projectId}/images/option2/`,
      );

      const [imagesOp1, imagesOp2] = await Promise.all([
        getImages(op1ImagesRef),
        getImages(op2ImagesRef),
      ]);
      return {
        materials,
        interiorViews,
        exteriorViews,
        imagesOp1,
        imagesOp2,
      };
    } else {
      console.error("Error getting screen 3 data. Document not found");
      throw new Error("An error occurred. Please try again.");
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw new Error("An error occurred. Please try again.");
  }
};
