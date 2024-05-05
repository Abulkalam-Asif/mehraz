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

const addReadyProjectS4ToDB = async ({
  projectId,
  designId,
  video,
  designCost,
  constructionCost,
  op1Name,
  op2Name,
  imagesOp1: [],
  imagesOp2: [], //imagesToDelOps1, imagesToDelOps2,
  keywords: [],
  description,
  descriptionOp1,
  descriptionOp2,
  exteriorViews: [], //exteriorViewsToDel,
  interiorViews: [], //interiorViewsToDel,
  materials: [],
  programs: [],      //programsToDel,
  designRates,
  constructionRates,
  discount,
  totalAmount,
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

    //Upload video to storage

    const designVideoRef = ref(storage, `RP_DESIGNS/${id}/video`);
    await uploadBytes(designVideoRef, video.get("video"));
    const designVideoUrl = await getDownloadURL(designVideoRef);

    // Upload views to DB
    const viewsRef = collection(db, "VIEWS");
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

export default addReadyProjectS4ToDB;
