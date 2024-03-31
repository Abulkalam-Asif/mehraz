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

const addFreeProjectS1ToDb = async ({
  title,
  city,
  area,
  budget,
  description,
  construction_cost,
  keywords,
  image,
  video,
}) => {
  try {
    if (city !== "GENERAL") {
      // Checking if the city exists in the database
      const cityDocRef = doc(collection(db, "CITIES"), city);
      const cityDoc = await getDoc(cityDocRef);
      if (!cityDoc.exists) {
        console.error("The selected city does not exist in the database.");
        return {
          data: null,
          type: "ERROR",
          message: "Something went wrong, please try again later.",
        };
      }
    }
    // Checking if the area exists in the database
    const areaDocRef = doc(collection(db, "PLOTS"), area);
    const areaDoc = await getDoc(areaDocRef);
    if (!areaDoc.exists) {
      console.error("The selected area does not exist in the database.");
      return {
        data: null,
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }
    // Checking if the free project with the same title already exists
    const freeProjectsRef = collection(db, "FREE_PROJECTS");
    const freeProjectQuery = query(
      freeProjectsRef,
      where("title", "==", title)
    );
    const freeProjectsDoc = await getDocs(freeProjectQuery);
    if (!freeProjectsDoc.empty) {
      console.error("The free project with the same title already exists.");
      return {
        data: null,
        type: "ERROR",
        message: " The free project with the same title already exists.",
      };
    }
    // Adding the free project to the database
    const response = await addDoc(freeProjectsRef, {
      title,
      city,
      area,
      budget,
      description,
      construction_cost,
      keywords,
      isCompleted: false,
      dateCreated: Timestamp.now(),
    });
    // Uploading the image and video to the storage
    const imageRef = ref(storage, `FREE_PROJECTS/${response.id}/image`);
    await uploadBytes(imageRef, image.get("image"));

    const videoRef = ref(storage, `FREE_PROJECTS/${response.id}/video`);
    await uploadBytes(videoRef, video.get("video"));

    return {
      data: response.id,
      type: "SUCCESS",
      message: "Free project screen 1 added successfully!",
    };
  } catch (error) {
    console.error("Error adding the free project: " + error);
    return {
      data: null,
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};
export default addFreeProjectS1ToDb;
