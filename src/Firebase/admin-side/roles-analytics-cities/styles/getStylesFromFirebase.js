"use server";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "@/Firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";

const getStylesFromDB = async (fields = ["id", "name", "budget"]) => {
  const stylesRef = collection(db, "STYLES");
  const styles = [];
  const promises = [];
  try {
    const styleDocs = await getDocs(stylesRef);
    styleDocs.forEach(doc => {
      const stylesData = {};
      fields.forEach(field => {
        if (field === "id") {
          stylesData[field] = doc.id;
        } else if (field === "image") {
          const imageName = `${doc.id}`;
          const imageRef = ref(storage, `STYLES/${imageName}`);
          promises.push(
            getDownloadURL(imageRef).then(url => {
              stylesData[field] = url;
            }),
          );
        } else {
          stylesData[field] = doc.data()[field];
        }
      });
      styles.push(stylesData);
    });
    await Promise.all(promises);
    return styles;
  } catch (error) {
    console.error("Error fetching styles from DB:", error);
    throw new Error("An error occurred. Please try again.");
  }
};

export default getStylesFromDB;
