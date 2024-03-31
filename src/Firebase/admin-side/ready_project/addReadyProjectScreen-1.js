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
import { ref, uploadBytes } from "firebase/storage";

const addReadyProjectS1ToDB = async ({
  title,
  cities,
  areas,
  budget,
  description,
  floors,
  units,
  style,
  construction_rates,
  production_rates,
  keywords,
  image,
  video,
}) => {
  try {
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

    const response = await addDoc(readyProjectsRef, {
      title,
      cities,
      areas,
      budget,
      description,
      floors,
      units,
      style,
      construction_rates,
      production_rates,
      keywords,
      isComplete: false,
      date_created: Timestamp.now(),
    });

    const imageRef = ref(storage, `READY_PROJECTS/${response.id}/image`);
    await uploadBytes(imageRef, image);

    const videoRef = ref(storage, `READY_PROJECTS/${response.id}/video`);
    await uploadBytes(videoRef, video);

    const imageUrl = await storage.ref(imageRef.fullPath).getDownloadURL();
    const videoUrl = await storage.ref(videoRef.fullPath).getDownloadURL();

    return {
      data: {
        id: response.id,
        image: imageUrl,
        video: videoUrl,
      },
      type: "SUCCESS",
      message: "Ready project screen 1 added successfully!",
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
