"use server";
import { db, storage } from "@/Firebase/firebase";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
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

const updateReadyProjectS4ToDB = async ({
  projectId,
  designId,
  video,
  designCost,
  constructionCost,
  op1Name,
  op2Name,
  imagesOp1,
  imagesOp2,
  keywords,
  description,
  descriptionOp1,
  descriptionOp2,
  exteriorViews,
  interiorViews,
  materials,
  programs,
  designRates,
  constructionRates,
  discount,
  totalCost,
  imagesOp1ToDel,
  imagesOp2ToDel,
  viewsToDelIds,
  programsToDelIds,
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

    //Delete old images from storage
    await Promise.all(
      imagesOp1ToDel?.map(async url => {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef);
      }) || [],
    );
    await Promise.all(
      imagesOp2ToDel?.map(async url => {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef);
      }) || [],
    );

    // Delete old views from DB
    const viewsRef = collection(db, "VIEWS");
    await Promise.all(
      viewsToDelIds?.map(async viewId => {
        const viewRef = doc(viewsRef, viewId);
        await deleteDoc(viewRef);
        const videoRef = ref(storage, `VIEWS/${viewId}`);
        await deleteObject(videoRef);
      }) || [],
    );

    //Delete old programs from DB
    await Promise.all(
      programsToDelIds?.map(async programId => {
        const programRef = doc(collection(db, "PROGRAMS"), programId);
        await deleteDoc(programRef);
      }) || [],
    );
    // Upload images to storage
    const timestamp = Date.now();
    const op1ImageUrls = [];
    const op2ImageUrls = [];
    await Promise.all(
      imagesOp1?.map(async (image, index) => {
        const op1ImageRef = ref(
          storage,
          `RP_DESIGNS/${designId}/images/option1/${ulid(timestamp)}`,
        );
        await uploadBytes(op1ImageRef, image.get(`image${index}`));
        op1ImageUrls.push(await getDownloadURL(op1ImageRef));
      }) || [],
    );
    await Promise.all(
      imagesOp2?.map(async (image, index) => {
        const op2ImageRef = ref(
          storage,
          `RP_DESIGNS/${designId}/images/option2/${ulid(timestamp)}`,
        );
        await uploadBytes(op2ImageRef, image.get(`image${index}`));
        op2ImageUrls.push(await getDownloadURL(op2ImageRef));
      }) || [],
    );

    //Upload video to storage
    let designVideoUrl = video;
    if (designVideoUrl instanceof FormData) {
      const designVideoRef = ref(storage, `RP_DESIGNS/${designId}/video`);
      await uploadBytes(designVideoRef, video.get("video"));
      designVideoUrl = await getDownloadURL(designVideoRef);
    }

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
      }) || [],
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
      }) || [],
    );
    // Upload programs to DB
    await Promise.all(
      programs?.map(async ({ id, category, quantity, subCategories }) => {
        const docRef = doc(collection(db, "PROGRAMS"), id);
        await setDoc(docRef, {
          category,
          quantity,
          subCategories,
        });
      }) || [],
    );

    // Update design document with new Data
    const designRef = doc(collection(db, "RP_DESIGNS"), designId);
    await updateDoc(designRef, {
      keywords,
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
      totalCost,
      interiorViews: interiorViewsData.map(({ id }) => id),
      exteriorViews: exteriorViewsData.map(({ id }) => id),
      materials,
      programs: programs.map(({ id }) => id),
    });

    await updateDoc(readyProjectDocRef, {
      uploadedDesigns: arrayUnion(designId),
    });

    return {
      data: {
        designVideoUrl,
        op1ImageUrls,
        op2ImageUrls,
        interiorViewsData,
        exteriorViewsData,
      },
      type: "SUCCESS",
      message: "Screen 4 updated successfully.",
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
