"use server";
import { db, storage } from "@/Firebase/firebase";
import {
  setDoc,
  collection,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { monotonicFactory } from "ulid";
const ulid = monotonicFactory();

const updateReadyProjectS3ToDB = async ({
  id,
  interiorViews,
  exteriorViews,
  imagesOp1,
  imagesOp2,
  materials,
  imagesOp1ToDel,
  imagesOp2ToDel,
  viewsToDelIds,
}) => {
  try {
    const readyProjectDocRef = doc(collection(db, "READY_PROJECTS"), id);

    // check if the document exists
    const readyProjectDoc = await getDoc(readyProjectDocRef);
    if (!readyProjectDoc.exists()) {
      return {
        data: null,
        type: "ERROR",
        message: "Something went wrong. Please try again.",
      };
    }

    //Delete old images from storage
    await Promise.all(
      imagesOp1ToDel?.map(async url => {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef);
      }),
    );
    await Promise.all(
      imagesOp2ToDel?.map(async url => {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef);
      }),
    );

    // Delete old views from DB
    const viewsRef = collection(db, "VIEWS");
    await Promise.all(
      viewsToDelIds?.map(async viewId => {
        const viewRef = doc(viewsRef, viewId);
        await deleteDoc(viewRef);
        const videoRef = ref(storage, `VIEWS/${viewId}`);
        await deleteObject(videoRef);
      }),
    );

    // Upload images to storage
    const timestamp = Date.now();
    const op1ImageUrls = [];
    const op2ImageUrls = [];
    await Promise.all(
      imagesOp1?.map(async (image, index) => {
        const op1ImageRef = ref(
          storage,
          `READY_PROJECTS/${id}/images/option1/${ulid(timestamp)}`,
        );
        await uploadBytes(op1ImageRef, image.get(`image${index}`));
        op1ImageUrls.push(await getDownloadURL(op1ImageRef));
      }),
    );
    await Promise.all(
      imagesOp2?.map(async (image, index) => {
        const op2ImageRef = ref(
          storage,
          `READY_PROJECTS/${id}/images/option2/${ulid(timestamp)}`,
        );
        await uploadBytes(op2ImageRef, image.get(`image${index}`));
        op2ImageUrls.push(await getDownloadURL(op2ImageRef));
      }),
    );

    // Upload views to DB
    const interiorViewsData = [];
    const exteriorViewsData = [];
    await Promise.all(
      interiorViews?.map(async ({ id, name, description, option, video }) => {
        const docRef = doc(viewsRef, id);
        await setDoc(docRef, {
          name,
          description,
          option,
          type: "INTERIOR",
        });
        let videoUrl = video;
        if (video instanceof FormData) {
          const videoRef = ref(storage, `VIEWS/${id}`);
          await uploadBytes(videoRef, video.get("video"));
          videoUrl = await getDownloadURL(videoRef);
        }
        interiorViewsData.push({ id, videoUrl });
      }),
    );
    await Promise.all(
      exteriorViews?.map(async ({ id, name, description, option, video }) => {
        const docRef = doc(viewsRef, id);
        await setDoc(docRef, {
          name,
          description,
          option,
          type: "EXTERIOR",
        });
        let videoUrl = video;
        if (video instanceof FormData) {
          const videoRef = ref(storage, `VIEWS/${id}`);
          await uploadBytes(videoRef, video.get("video"));
          videoUrl = await getDownloadURL(videoRef);
        }
        exteriorViewsData.push({ id, videoUrl });
      }),
    );

    // Upload views and materials to DB
    await updateDoc(readyProjectDocRef, {
      interiorViews: interiorViewsData.map(({ id }) => id),
      exteriorViews: exteriorViewsData.map(({ id }) => id),
      materials,
    });

    return {
      data: {
        op1ImageUrls,
        op2ImageUrls,
        interiorViewsData,
        exteriorViewsData,
      },
      type: "SUCCESS",
      message: "Screen 3 added successfully.",
    };
  } catch (error) {
    console.error("Error adding ready project screen 3 to DB: ", error);
    return {
      data: null,
      type: "ERROR",
      message: "An error occurred. Please try again.",
    };
  }
};

export default updateReadyProjectS3ToDB;
