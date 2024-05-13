"use server";
import { db, storage } from "@/Firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const updateReadyProjectS2ToDB = async ({ id, designs, budgetRanges }) => {
  try {
    const readyProjectsRef = collection(db, "READY_PROJECTS");
    const readyProjectDocRef = doc(readyProjectsRef, id);
    const readyProjectDoc = await getDoc(readyProjectDocRef);

    if (!readyProjectDoc.exists()) {
      console.error("No document found!");
      return {
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }

    // These are all the possible design combinations.
    const prevDesigns = readyProjectDoc.data()?.designs || [];
    // These are the designs whose data has been uploaded.
    let prevUploadedDesigns = readyProjectDoc.data()?.uploadedDesigns || [];
    const rpDesignsIds = [];
    const rpDesignsData = [];
    let newDesigns = [];

    // Delete designs from RP_DESIGNS collection and ready project which are not included in the selected designs
    await Promise.all(
      prevDesigns?.map(async prevDesignId => {
        const prevDesignDocRef = doc(
          collection(db, "RP_DESIGNS"),
          prevDesignId,
        );

        const prevDesignData = (await getDoc(prevDesignDocRef)).data();

        rpDesignsData.push(prevDesignData);
        const matchingNewDesign = designs.find(
          newDesign =>
            newDesign.areaId === prevDesignData.areaId &&
            newDesign.floorId === prevDesignData.floorId &&
            newDesign.familyUnitId === prevDesignData.familyUnitId,
        );

        if (!matchingNewDesign) {
          // Remove design from RP_DESIGNS collection
          await deleteDoc(prevDesignDocRef);
          const storageRef = ref(storage, `RP_DESIGNS/${prevDesignId}`);
          await deleteObject(storageRef).catch(error => {
            console.error("Error deleting object from storage: ", error);
          });
          if (prevUploadedDesigns.includes(prevDesignId)) {
            prevUploadedDesigns = prevUploadedDesigns.filter(
              design => design !== prevDesignId,
            );
          }
        } else {
          rpDesignsIds.push(prevDesignId);
        }
      }) || [],
    );

    // Obtain a third array containing objects from array1 that are not present in array2
    newDesigns = designs.filter(
      obj1 =>
        !rpDesignsData.some(
          obj2 =>
            obj1.areaId === obj2.areaId &&
            obj1.familyUnitId === obj2.familyUnitId &&
            obj1.floorId === obj2.floorId,
        ),
    );

    // Add the remaining new designs to the database
    const rpDesignsRef = collection(db, "RP_DESIGNS");

    await Promise.all(
      newDesigns?.map(async design => {
        const response = await addDoc(rpDesignsRef, design);
        rpDesignsIds.push(response.id);
      }) || [],
    );

    //Update the ready project document
    await updateDoc(readyProjectDocRef, {
      designs: rpDesignsIds,
      uploadedDesigns: prevUploadedDesigns,
      budgetRanges,
    });

    return {
      type: "SUCCESS",
      message: "Screen 2 updated successfully!",
    };
  } catch (error) {
    console.error("Error updating the ready project: ", error.message);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updateReadyProjectS2ToDB;
