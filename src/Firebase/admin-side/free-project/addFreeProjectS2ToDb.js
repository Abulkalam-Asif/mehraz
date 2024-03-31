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
import { ulid } from "ulid";

const addFreeProjectS2ToDb = async ({
  id,
  designFile,
  images,
  programs,
  exteriorViews,
  interiorViews,
  materials,
}) => {
  try {
    // Checking if a FREE_PROJECT with the given id exists in the database
    const projectDocRef = doc(collection(db, "FREE_PROJECTS"), id);
    const projectDoc = await getDoc(projectDocRef);
    if (!projectDoc.exists) {
      console.error("The free project does not exist in the database.");
      return {
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }
    // // Adding the free project to the database
    // const response = await addDoc(freeProjectsRef, {
    //   title,
    //   city,
    //   area,
    //   budget,
    //   description,
    //   construction_cost,
    //   keywords,
    //   isCompleted: false,
    //   dateCreated: Timestamp.now(),
    // });

    // Uploading the design file to the storage
    const designFileRef = ref(storage, `FREE_PROJECTS/${id}/design_file`);
    await uploadBytes(designFileRef, designFile.get("designFile"));

    // Uploading the images to the storage
    for (let image of images) {
      const imageRef = ref(
        storage,
        `FREE_PROJECTS/${id}/images/${ulid(0)}`,
      );
      await uploadBytes(imageRef, image.get("image"));
    }

    return {
      data: response.id,
      type: "SUCCESS",
      message: "Free project screen 2 added successfully!",
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
export default addFreeProjectS2ToDb;
