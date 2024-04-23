"use server";
import { db, storage } from "@/Firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
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
        data: null,
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }

    const readyProjectPrevDesigns = readyProjectDoc.data().designs;
    const rpDesignsIds = [];
    const rpDesignsData = [];
    let newDesigns = [];

    console.log("Ready project designs: ", readyProjectPrevDesigns);

    // Delete designs from RP_DESIGNS collection and ready project which are not included in the selected designs

    await Promise.all(
      readyProjectPrevDesigns?.map(async prevDesignId => {
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
          console.log("Not matching Design: ", prevDesignId);
          // Remove design from RP_DESIGNS collection
          await deleteDoc(prevDesignDocRef);
          const storageRef = ref(storage, `RP_DESIGNS/${prevDesignId}`);
          await deleteObject(storageRef).catch(error => {
            console.error("Error deleting object from storage: ", error);
          });
        } else {
          rpDesignsIds.push(prevDesignId);
        }
      }),
    );

    // console.log("Designs after deletion: ", designs);
    console.log("Prev designs array: ", rpDesignsData);
    console.log("Prev designs IDS: ", rpDesignsIds);


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

    console.log("New Data: ", newDesigns);

    // Add the remaining new designs to the database
    const rpDesignsRef = collection(db, "RP_DESIGNS");
 
    await Promise.all(
      newDesigns.map(async design => {
        const response = await addDoc(rpDesignsRef, design);
        rpDesignsIds.push(response.id);
      }),
    );
    console.log("Prev designs IDS Below: ", rpDesignsIds);

    //Update the ready project document
    await updateDoc(readyProjectDocRef, {
      designs: rpDesignsIds,
      budgetRanges,
    });

    return {
      data: rpDesignsIds,
      type: "SUCCESS",
      message: "Ready project screen 2 updated successfully!",
    };
  } catch (error) {
    console.error("Error updating the ready project: ", error.message);
    return {
      data: null,
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updateReadyProjectS2ToDB;
