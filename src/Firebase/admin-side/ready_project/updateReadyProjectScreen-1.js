"use server";
import { db, storage } from "@/Firebase/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const updateReadyProjectS1ToDB = async ({
  id,
  title,
  cities,
  areas,
  budget,
  description,
  floors,
  units,
  style,
  constructionRates,
  productRates,
  keywords,
  image,
  video,
}) => {
  try {
    const readyProjectsRef = collection(db, "READY_PROJECTS");
    const readyProjectsDocRef = doc(readyProjectsRef, id);
    const readyProjectsDoc = await getDoc(readyProjectsDocRef);
    if (!readyProjectsDoc.exists) {
      console.error("Ready project not found with the given id!");
      return {
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }

    for (const city of cities) {
      const cityDocRef = doc(collection(db, "CITIES"), city);
      const cityDoc = await getDoc(cityDocRef);
      if (!cityDoc.exists) {
        console.error("City not found with the given id!");
        return {
          type: "ERROR",
          message: "Something went wrong, please try again later.",
        };
      }
    }

    for (const area of areas) {
      const areaDocRef = doc(collection(db, "PLOTS"), area);
      const areaDoc = await getDoc(areaDocRef);
      if (!areaDoc.exists) {
        console.error("Area not found with the given id!");
        return {
          type: "ERROR",
          message: "Something went wrong, please try again later.",
        };
      }
    }

    for (const floor of floors) {
      const floorDocRef = doc(collection(db, "FLOORS"), floor);
      const floorDoc = await getDoc(floorDocRef);
      if (!floorDoc.exists) {
        console.error("Floor not found with the given id!");
        return {
          type: "ERROR",
          message: "Something went wrong, please try again later.",
        };
      }
    }

    for (const unit of units) {
      const unitDocRef = doc(collection(db, "UNITS"), unit);
      const unitDoc = await getDoc(unitDocRef);
      if (!unitDoc.exists) {
        console.error("Unit not found with the given id!");
        return {
          type: "ERROR",
          message: "Something went wrong, please try again later.",
        };
      }
    }

    const styleRef = doc(collection(db, "STYLES"), style);
    const styleDoc = await getDoc(styleRef);
    if (!styleDoc.exists) {
      console.error("Style not found with the given id!");
      return {
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }

    await updateDoc(readyProjectsDocRef, {
      title,
      cities,
      areas,
      budget,
      description,
      floors,
      units,
      style,
      constructionRates,
      productRates,
      keywords,
      isComplete: false,
    });
    let imageUrl = readyProjectsDoc.data().image;
    let videoUrl = readyProjectsDoc.data().video;
    if (image instanceof FormData) {
      const imageRef = ref(storage, `READY_PROJECTS/${id}/image`);
      await uploadBytes(imageRef, image.get("image"));
      imageUrl = await getDownloadURL(imageRef);
    }
    if (video instanceof FormData) {
      const videoRef = ref(storage, `READY_PROJECTS/${id}/video`);
      await uploadBytes(videoRef, video.get("video"));
      videoUrl = await getDownloadURL(videoRef);
    }

    return {
      type: "SUCCESS",
      message: "Project screen 1 updated successfully!",
    };
  } catch (error) {
    console.error("Error updating ready project screen 1: ", error.message);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updateReadyProjectS1ToDB;
