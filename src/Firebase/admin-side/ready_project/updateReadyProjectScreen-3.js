"use server";
import { db, storage } from "@/Firebase/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { monotonicFactory } from "ulid";
const ulid = monotonicFactory();

const updateReadyProjectS3ToDB = async ({
  id,
  interiorViews,
  exteriorViews,
  imagesOp1,
  imagesOp2,
  materials,
}) => {
  try {
    const readyProjectDocRef = doc(collection(db, "READY_PROJECTS"), id);

    // check if the document exists
    const readyProjectDoc = await getDoc(readyProjectDocRef);
    if (!readyProjectDoc.exists()) {
      return {
        data: null,
        type: "ERROR",
        message: "Something went wrong. Please try again later.",
      };
    }

    // Upload images to storage
    const timestamp = Date.now();
    const op1ImageUrls = [];
    const op2ImageUrls = [];
    await Promise.all(
      imagesOp1.map(async (image, index) => {
        const op1ImageRef = ref(
          storage,
          `READY_PROJECTS/${id}/images/option1/${ulid(timestamp)}`,
        );
        await uploadBytes(op1ImageRef, image.get(`image${index}`));
        op1ImageUrls.push(await getDownloadURL(op1ImageRef));
      }),
    );
    await Promise.all(
      imagesOp2.map(async (image, index) => {
        const op2ImageRef = ref(
          storage,
          `READY_PROJECTS/${id}/images/option2/${ulid(timestamp)}`,
        );
        await uploadBytes(op2ImageRef, image.get(`image${index}`));
        op2ImageUrls.push(await getDownloadURL(op2ImageRef));
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
      data: {
        op1ImageUrls,
        op2ImageUrls,
      },
      type: "SUCCESS",
      message: "Ready project screen 3 added successfully.",
    };
  } catch (error) {
    console.error("Error adding ready project screen 3 to DB: ", error);
    return {
      data: null,
      type: "ERROR",
      message: "An error occurred. Please try again later.",
    };
  }
};

export default updateReadyProjectS3ToDB;
