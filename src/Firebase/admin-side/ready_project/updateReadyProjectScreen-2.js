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
        data: null,
        type: "ERROR",
        message: "Something went wrong, please try again later.",
      };
    }

    // Getting previous designs from the database
    const readyProjectPrevDesigns = readyProjectDoc.data().designs;
    const rpDesignsIds = [];
    if (readyProjectPrevDesigns?.length > 0) {
      await Promise.all(
        readyProjectPrevDesigns?.map(async prevDesignId => {
          const prevDesignDocRef = doc(
            collection(db, "RP_DESIGNS"),
            prevDesignId,
          );
          const prevDesignData = (await getDoc(prevDesignDocRef)).data();
          if (
            designs.find(
              newDesign =>
                newDesign.areaId === prevDesignData.areaId &&
                newDesign.floorId === prevDesignData.floorId &&
                newDesign.familyUnitId === prevDesignData.familyUnitId,
            )
          ) {
            // If any of the previous designs is present in the new designs, then add it to alreadyAddedDesigns array and remove it from the new designs array
            rpDesignsIds.push(prevDesignId);
            designs = designs.filter(
              newDesign =>
                newDesign.areaId !== prevDesignData.areaId ||
                newDesign.floorId !== prevDesignData.floorId ||
                newDesign.familyUnitId !== prevDesignData.familyUnitId,
            );
          } else {
            // If any of the previous designs is not present in the new designs, then delete it from the database
            await deleteDoc(prevDesignDocRef);
            const storageRef = ref(storage, `RP_DESIGNS/${prevDesignId}`);
            deleteObject(storageRef)
              .then(() => {})
              .catch(error => {});
          }
        }),
      );
    }

    // Add the remaining new designs to the database
    const rpDesignsRef = collection(db, "RP_DESIGNS");

    await Promise.all(
      designs.map(async design => {
        const response = await addDoc(rpDesignsRef, {
          ...design,
        });
        rpDesignsIds.push(response.id);
      }),
    );

    // Update the ready project document
    await updateDoc(readyProjectDocRef, {
      designs: rpDesignsIds,
      budgetRanges,
    });

    return {
      data: rpDesignsIds,
      type: "SUCCESS",
      message: "Ready project screen 2 added successfully!",
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

export default updateReadyProjectS2ToDB;
