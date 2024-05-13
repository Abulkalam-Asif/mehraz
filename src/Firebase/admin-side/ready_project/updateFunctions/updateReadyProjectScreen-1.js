"use server";
import { db, storage } from "@/Firebase/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

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
        data: null,
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
        console.error("Area not found with the given id!");
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
        console.error("Floor not found with the given id!");
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
        console.error("Unit not found with the given id!");
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
      console.error("Style not found with the given id!");
      return {
        data: null,
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }

    // Get previous areas and floors
    let prevDesigns = readyProjectsDoc.data()?.designs || [];
    let prevUploadedDesigns = readyProjectsDoc.data()?.uploadedDesigns || [];
    if (prevDesigns?.length > 0) {
      const removedAreas = readyProjectsDoc
        .data()
        .areas.filter(area => !areas.includes(area));
      const removedFloors = readyProjectsDoc
        .data()
        .floors.filter(floor => !floors.includes(floor));
      const deletionPromises = [];

      // Delete previous designs if their area or floor is removed
      for (const prevDesign of prevDesigns) {
        const rpDesignDocRef = doc(collection(db, "RP_DESIGNS"), prevDesign);
        const rpDesignDoc = await getDoc(rpDesignDocRef);
        if (rpDesignDoc.exists()) {
          const rpDesignData = rpDesignDoc.data();
          if (
            removedAreas.includes(rpDesignData.areaId) ||
            removedFloors.includes(rpDesignData.floorId)
          ) {
            const deletePromise = async () => {
              await deleteDoc(rpDesignDocRef);
              const storageRef = ref(storage, `RP_DESIGNS/${prevDesign}`);
              deleteObject(storageRef)
                .then(() => {})
                .catch(error => {});
            };
            deletionPromises.push(deletePromise);
            // Remove the design from the previous designs array
            prevDesigns = prevDesigns.filter(design => design !== prevDesign);
            // Remove the design from the uploaded designs array
            if (prevUploadedDesigns.includes(prevDesign)) {
              prevUploadedDesigns = prevUploadedDesigns.filter(
                design => design !== prevDesign,
              );
            }
          }
        }
      }
      await Promise.all(deletionPromises);
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
      designs: prevDesigns,
      uploadedDesigns: prevUploadedDesigns,
    });
    let imageUrl = image;
    let videoUrl = video;
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
      data: {
        imageUrl,
        videoUrl,
      },
      type: "SUCCESS",
      message: "Project screen 1 updated successfully!",
    };
  } catch (error) {
    console.error("Error updating ready project screen 1: ", error.message);
    return {
      data: null,
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updateReadyProjectS1ToDB;
