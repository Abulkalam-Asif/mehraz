"use server";
import { db, storage } from "@/Firebase/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { monotonicFactory } from "ulid";
const ulid = monotonicFactory();

const updateReadyProjectS4ToDB = async ({
  projectId,
  designId,
  video,
  designCost,
  constructionCost,
  op1Name,
  op2Name,
  imagesOp1: [],
  imagesOp2: [],
  keywords: [],
  description,
  descriptionOp1,
  descriptionOp2,
  exteriorViews: [],
  interiorViews: [],
  materials: [],
  programs: [],
  designRates,
  constructionRates,
  discount,
  totalAmount,
  imagesToDelOps1,
  imagesToDelOps2,
  programsToDel,
  exteriorViewsToDel,
  interiorViewsToDel,
}) => {
  try {
    const readyProjectDocRef = doc(collection(db, "READY_PROJECTS"), projectId);

    // check if the document exists
    const readyProjectDoc = await getDoc(readyProjectDocRef);
    if (!readyProjectDoc.exists()) {
      return {
        data: null,
        type: "ERROR",
        message: "Something went wrong. Please try again.",
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
          `RP_DESIGNS/${id}/images/option1/${ulid(timestamp)}`,
        );
        await uploadBytes(op1ImageRef, image.get(`image${index}`));
        op1ImageUrls.push(await getDownloadURL(op1ImageRef));
      }),
    );
    await Promise.all(
      imagesOp2.map(async (image, index) => {
        const op2ImageRef = ref(
          storage,
          `RP_DESIGNS/${id}/images/option2/${ulid(timestamp)}`,
        );
        await uploadBytes(op2ImageRef, image.get(`image${index}`));
        op2ImageUrls.push(await getDownloadURL(op2ImageRef));
      }),
    );

    //Delete old images from storage
    await Promise.all(
      imagesToDelOps1?.map(async url => {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef);
      }),
    );
    await Promise.all(
      imagesToDelOps2?.map(async url => {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef);
      }),
    );

    // Delete old views from DB
    const viewsRef = collection(db, "VIEWS");
    await Promise.all(
      interiorViewsToDel?.map(async viewId => {
        const viewRef = doc(viewsRef, viewId);
        await deleteDoc(viewRef);
        const videoRef = ref(storage, `VIEWS/${viewId}`);
        await deleteObject(videoRef);
      }),
    );
    await Promise.all(
      exteriorViewsToDel?.map(async viewId => {
        const viewRef = doc(viewsRef, viewId);
        await deleteDoc(viewRef);
        const videoRef = ref(storage, `VIEWS/${viewId}`);
        await deleteObject(videoRef);
      }),
    );

    //Delete old programs from DB
    await Promise.all(
      programsToDel?.map(async programId => {
        const programRef = doc(collection(db, "PROGRAMS"), programId);
        await deleteDoc(programRef);
      }),
    );

    //Upload video to storage

    const designVideoRef = ref(storage, `RP_DESIGNS/${id}/video`);
    await uploadBytes(designVideoRef, video.get("video"));
    const designVideoUrl = await getDownloadURL(designVideoRef);

    // Upload views to DB
    const interiorViewsData = [];
    const exteriorViewsData = [];
    await Promise.all(
      interiorViews.map(async ({ id, name, description, option, video }) => {
        const docRef = doc(viewsRef, id);
        await setDoc(docRef, {
          name,
          description,
          option,
          type: "INTERIOR",
        });
        const videoRef = ref(storage, `VIEWS/${id}`);
        await uploadBytes(videoRef, video.get("video"));
        const videoUrl = await getDownloadURL(videoRef);

        interiorViewsData.push({ id, videoUrl });
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
        const videoRef = ref(storage, `VIEWS/${id}`);
        await uploadBytes(videoRef, video.get("video"));
        const videoUrl = await getDownloadURL(videoRef);

        exteriorViewsData.push({ id, videoUrl });
      }),
    );

    // Upload views and materials to DB
    await updateDoc(readyProjectDocRef, {
      interiorViews: interiorViewsData.map(view => view.id),
      exteriorViews: exteriorViewsData.map(view => view.id),
      materials,
      uploadedScreensCount: 4,
    });

    // Update design document with new Data
    const designRef = doc(collection(db, "RP_DESIGNS"), designId);
    await updateDoc(designRef, {
      designCost,
      constructionCost,
      op1Name,
      op2Name,
      description,
      descriptionOp1,
      descriptionOp2,
      designRates,
      constructionRates,
      discount,
      totalAmount,
    });

    await updateDoc(readyProjectDocRef, {
      uploadedDesigns: arrayUnion(designId),
    });

    await Promise.all(
      programs.map(async program => {
        const programRef = doc(collection(db, "PROGRAMS"), program.id);
        await setDoc(programRef, {
          program: program,
        });
      }),
    );

    return {
      data: {
        op1ImageUrls,
        op2ImageUrls,
        interiorViewsData,
        exteriorViewsData,
        designVideoUrl,
      },
      type: "SUCCESS",
      message: "Ready project screen 4 added successfully.",
    };
  } catch (error) {
    console.error("Error adding ready project screen 4 to DB: ", error);
    return {
      data: null,
      type: "ERROR",
      message: "An error occurred. Please try again.",
    };
  }
};

export default updateReadyProjectS4ToDB;
