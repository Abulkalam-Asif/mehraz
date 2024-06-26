"use server";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "@/Firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";

const getStyleById = async (id, fields = ["name", "budget"]) => {
  const styleRef = doc(db, "STYLES", id);
  try {
    const styleDoc = await getDoc(styleRef);

    if (!styleDoc.exists()) {
      throw new Error("Style document does not exist.");
    }

    const styleData = {};

    const fieldPromises = fields.map(async field => {
      if (field === "image") {
        const imageRef = ref(storage, `STYLES/${styleDoc.id}`);
        const imageUrl = await getDownloadURL(imageRef);
        styleData[field] = imageUrl;
      } else {
        styleData[field] = styleDoc.data()[field];
      }
    });

    await Promise.all(fieldPromises);

    return styleData;
  } catch (error) {
    console.error("Error fetching style from DB:", error);
    throw new Error(
      "An error occurred while fetching style data. Please try again.",
    );
  }
};

export default getStyleById;
