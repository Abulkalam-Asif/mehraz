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
        throw new Error("The selected city does not exist in the database.");
      }
    }

    for (const area of areas) {
      const areaDocRef = doc(collection(db, "PLOTS"), area);
      const areaDoc = await getDoc(areaDocRef);
      if (!areaDoc.exists) {
        throw new Error("The selected area does not exist in the database.");
      }
    }

    const readyProjectsRef = collection(db, "READY_PROJECTS");
    const readyProjectQuery = query(
      readyProjectsRef,
      where("title", "==", title),
    );
    const readyProjectsDoc = await getDocs(readyProjectQuery);
    if (!readyProjectsDoc.empty) {
      throw new Error("The ready project with the same title already exists.");
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
      project_id: response.id,
      image_url: imageUrl,
      video_url: videoUrl,
      type: "SUCCESS",
      message: "Ready project screen 1 added successfully!",
    };
  } catch (error) {
    console.error("Error adding the ready project: ", error.message);
    return {
      data: null,
      type: "ERROR",
      message: error.message || "Something went wrong, please try again later.",
    };
  }
};

export default addReadyProjectS1ToDB;
