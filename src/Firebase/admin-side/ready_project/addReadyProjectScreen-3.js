"use server";
import { db, storage } from "@/Firebase/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { monotonicFactory } from "ulid";
const ulid = monotonicFactory();

const addReadyProjectS3ToDB = async ({
  id,
  interiorViews,
  exteriorViews,
  imagesOp1,
  imagesOp2,
  materials,
}) => {
  try {
    const readyProjectDocRef = doc(collection(db, "READY_PROJECTS"), id);

    // Upload images to storage
    const timestamp = Date.now();
    await Promise.all(
      imagesOp1.map(async (image, index) => {
        const op1ImageRef = ref(
          storage,
          `READY_PROJECTS/${id}/images/option1/${ulid(timestamp)}`,
        );
        await uploadBytes(op1ImageRef, image.get(`image${index}`));
      }),
    );
    await Promise.all(
      imagesOp2.map(async (image, index) => {
        const op2ImageRef = ref(
          storage,
          `READY_PROJECTS/${id}/images/option2/${ulid(timestamp)}`,
        );
        await uploadBytes(op2ImageRef, image.get(`image${index}`));
      }),
    );

    // Upload views to DB
    const viewsRef = collection(db, "VIEWS");
    const interiorViewsIds = [];
    const exteriorViewsIds = [];
    await Promise.all(
      interiorViews.map(async ({ id, name, description, option, video }) => {
        const response = await addDoc(viewsRef, {
          id,
          name,
          description,
          option,
          type: "INTERIOR",
        });
        interiorViewsIds.push(response.id);
        const videoRef = ref(storage, `VIEWS/${response.id}`);
        await uploadBytes(videoRef, video.get("video"));
      }),
    );
    await Promise.all(
      exteriorViews.map(async ({ id, name, description, option, video }) => {
        const response = await addDoc(viewsRef, {
          id,
          name,
          description,
          option,
          type: "EXTERIOR",
        });
        exteriorViewsIds.push(response.id);
        const videoRef = ref(storage, `VIEWS/${response.id}`);
        await uploadBytes(videoRef, video.get("video"));
      }),
    );

    // Upload views and materials to DB
    await updateDoc(readyProjectDocRef, {
      interiorViews: interiorViewsIds,
      exteriorViews: exteriorViewsIds,
      materials,
    });
    return {
      type: "SUCCESS",
      message: "Ready project screen 3 added successfully.",
    };
  } catch (error) {
    console.error("Error adding ready project screen 3 to DB: ", error);
    return {
      type: "ERROR",
      message: "An error occurred. Please try again later.",
    };
  }
};

export default addReadyProjectS3ToDB;
