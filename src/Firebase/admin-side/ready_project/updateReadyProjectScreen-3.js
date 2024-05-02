"use server";
import { db, storage } from "@/Firebase/firebase";
import {
  addDoc,
  setDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { monotonicFactory } from "ulid";
const ulid = monotonicFactory();

const updateReadyProjectS3ToDB = async ({
  id,
  interiorViews,
  exteriorViews,
  imagesOp1, //only FormData
  imagesOp2,
  materials,
  images1ToDel, //only URLs
  images2ToDel,
  interiorViewsToDel, //only IDS
  exteriorViewsToDel,
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
      images1ToDel.map(async url => {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef);
      }),
    );
    await Promise.all(
      images2ToDel.map(async url => {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef);
      }),
    );

    // Delete old views from DB
    const delInteriorViewsRef = collection(db, "VIEWS");
    await Promise.all(
      interiorViewsToDel.map(async id => {
        const viewRef = doc(delInteriorViewsRef, id);
        await deleteDoc(viewRef);
      }),
    );

    const delExteriorViewsRef = collection(db, "VIEWS");
    await Promise.all(
      exteriorViewsToDel.map(async id => {
        const viewRef = doc(delExteriorViewsRef, id);
        await deleteDoc(viewRef);
      }),
    );

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

    // Upload New views to DB
    const viewsRef = collection(db, "VIEWS");
    const interiorViewsIds = [];
    const exteriorViewsIds = [];
    await Promise.all(
      interiorViews.map(async ({ id, name, description, option, video }) => {
        const docRef = doc(viewsRef, id);
        await setDoc(docRef, {
          name,
          description,
          option,
          type: "INTERIOR",
        });
        interiorViewsIds.push(id);
        const videoRef = ref(storage, `VIEWS/${id}`);
        await uploadBytes(videoRef, video.get("video"));
      }),
    );

    await Promise.all(
      exteriorViews.map(async ({ id, name, description, option, video }) => {
        const docRef = doc(viewsRef, id);
        await setDoc(docRef, {
          name,
          description,
          option,
          type: "EXTERIOR",
        });
        exteriorViewsIds.push(id);
        const videoRef = ref(storage, `VIEWS/${id}`);
        await uploadBytes(videoRef, video.get("video"));
      }),
    );

    // Upload views and materials to DB
    await updateDoc(readyProjectDocRef, {
      interiorViews: arrayUnion(interiorViewsIds),
      exteriorViews: arrayUnion(exteriorViewsIds),
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
      message: "An error occurred. Please try again.",
    };
  }
};

export default updateReadyProjectS3ToDB;
