"use server";
import { storage } from "@/Firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";

const getBannerImage = async fileName => {
  const imageRef = ref(storage, `BANNERS/${fileName}`);
  try {
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (e) {
    console.error("Error getting banner image: ", e);
    return null;
  }
};

export default getBannerImage;
