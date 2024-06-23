"use server";
import { db, storage } from "@/Firebase/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const addReadyProjectS1ToDB = async ({
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

    // Validations
    const readyProjectsRef = collection(db, "READY_PROJECTS");
    const readyProjectQuery = query(
      readyProjectsRef,
      where("title", "==", title),
    );
    const readyProjectsDoc = await getDocs(readyProjectQuery);
    if (!readyProjectsDoc.empty) {
      return {
        data: null,
        type: "ERROR",
        message: "A project with this name already exists.",
      };
    }

    for (const city of cities) {
      const cityDocRef = doc(collection(db, "CITIES"), city);
      const cityDoc = await getDoc(cityDocRef);
      if (!cityDoc.exists) {
        return {
          data: null,
          type: "ERROR",
          message: "Something went wrong, please try again later.",
        };
      }
    }

    for (const area of areas) {
      const areaDocRef = doc(collection(db, "PLOTS"), area);
      const areaDoc = await getDoc(areaDocRef);
      if (!areaDoc.exists) {
        return {
          data: null,
          type: "ERROR",
          message: "Something went wrong, please try again later.",
        };
      }
    }

    for (const floor of floors) {
      const floorDocRef = doc(collection(db, "FLOORS"), floor);
      const floorDoc = await getDoc(floorDocRef);
      if (!floorDoc.exists) {
        return {
          data: null,
          type: "ERROR",
          message: "Something went wrong, please try again later.",
        };
      }
    }

    for (const unit of units) {
      const unitDocRef = doc(collection(db, "UNITS"), unit);
      const unitDoc = await getDoc(unitDocRef);
      if (!unitDoc.exists) {
        return {
          data: null,
          type: "ERROR",
          message: "Something went wrong, please try again later.",
        };
      }
    }

    const styleRef = doc(collection(db, "STYLES"), style);
    const styleDoc = await getDoc(styleRef);
    if (!styleDoc.exists) {
      return {
        data: null,
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }
   
    // uploading Data to DB
    const response = await addDoc(readyProjectsRef, {
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
      dateCreated: Timestamp.now(),
      uploadedScreensCount: 1,
    });
   
    //Uploading Data to Firebase Storage
    const imageRef = ref(storage, `READY_PROJECTS/${response.id}/image`);
    await uploadBytes(imageRef, image.get("image"));
    const imageUrl = await getDownloadURL(imageRef);

    const videoRef = ref(storage, `READY_PROJECTS/${response.id}/video`);
    await uploadBytes(videoRef, video.get("video"));
    const videoUrl = await getDownloadURL(videoRef);

    return {
      data: {
        id: response.id,
        imageUrl,
        videoUrl,
      },
      type: "SUCCESS",
      message: "Screen 1 added successfully!",
    };
  } catch (error) {
    console.error("Error adding the ready project: ", error.message);
    return {
      data: null,
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default addReadyProjectS1ToDB;
