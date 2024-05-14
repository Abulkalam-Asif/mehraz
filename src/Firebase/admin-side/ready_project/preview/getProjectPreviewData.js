"use server";
import { db, storage } from "@/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";

const getProjectPreviewData = async projectId => {
  const readyProjectDocRef = doc(db, "READY_PROJECTS", projectId);
  try {
    const readyProjectDoc = await getDoc(readyProjectDocRef);
    if (
      readyProjectDoc.exists() &&
      readyProjectDoc.data()?.uploadedScreensCount === 4
    ) {
      // Getting images and videos
      const imageRef = ref(storage, `READY_PROJECTS/${projectId}/image`);
      const imageUrl = await getDownloadURL(imageRef);
      const videoRef = ref(storage, `READY_PROJECTS/${projectId}/video`);
      const videoUrl = await getDownloadURL(videoRef);
      const op1ImagesRef = ref(
        storage,
        `READY_PROJECTS/${projectId}/images/option1/`,
      );
      const op1Images = await getImages(op1ImagesRef);
      const op2ImagesRef = ref(
        storage,
        `READY_PROJECTS/${projectId}/images/option2/`,
      );
      const op2Images = await getImages(op2ImagesRef);

      const materialIds =
        readyProjectDoc.data()?.materials.map(({ id }) => id) || [];
      const materials = await Promise.all(
        materialIds?.map(async materialId => {
          try {
            return await getMaterialData(materialId);
          } catch (error) {
            console.error("Error getting material data: ", error);
            throw new Error(
              "An error occurred while fetching data. Please check your internet connection and try again.",
            );
          }
        }) || [],
      );
      const projectData = {
        title: readyProjectDoc.data().title,
        description: readyProjectDoc.data().description,
        materials: materials,
        image: imageUrl,
        video: videoUrl,
        option1Images: op1Images,
        option2Images: op2Images,
      };
      return projectData;
    }
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  } catch (error) {
    console.error("Error getting the project data for preview: ", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};

const getMaterialData = async materialId => {
  const materialDocRef = doc(db, "MATERIALS", materialId);
  const image1Ref = ref(storage, `MATERIALS/${materialId}/image1`);
  try {
    const materialDoc = await getDoc(materialDocRef);
    if (!materialDoc.exists()) {
      throw new Error(
        "An error occurred while fetching material data. Please check your internet connection and try again.",
      );
    }
    const image1Url = await getDownloadURL(image1Ref);
    return {
      name: materialDoc.data().name,
      rate: materialDoc.data().rate,
      image: image1Url,
    };
  } catch (error) {
    console.error("Error getting the material data: ", error);
    throw new Error(
      "An error occurred while fetching material data. Please check your internet connection and try again.",
    );
  }
};

const getImages = async imagesRef => {
  const imageUrls = [];
  const result = await listAll(imagesRef);
  await Promise.all(
    result.items?.map(async imageRef => {
      const imageUrl = await getDownloadURL(imageRef);
      imageUrls.push(imageUrl);
    }) || [],
  );
  return imageUrls;
};

export default getProjectPreviewData;
