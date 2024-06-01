"use server";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "@/Firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";

const getMaterialsFromDb = async (
  fields = [
    "id",
    "name",
    "vendor",
    "rate",
    "category",
    "description",
    "specs",
    "orderedAs",
    "image1",
    "image2",
  ],
) => {
  const materialsRef = collection(db, "MATERIALS");
  const materials = [];
  const promises = [];
  try {
    const materialDocs = await getDocs(materialsRef);
    materialDocs.forEach(doc => {
      const materialData = {};
      fields.forEach(field => {
        if (field === "id") {
          materialData[field] = doc.id;
        } else if (field === "image1" || field === "image2") {
          const imageName = `${doc.id}/${field}`;
          const imageRef = ref(storage, `MATERIALS/${imageName}`);
          promises.push(
            getDownloadURL(imageRef).then(url => {
              materialData[field] = url;
            }),
          );
        } else {
          materialData[field] = doc.data()[field];
        }
      });
      materials.push(materialData);
    });
    await Promise.all(promises);
    return materials;
  } catch (error) {
    console.error("Error fetching materials from DB:", error);
    throw new Error("An error occurred. Please try again.");
  }
};

export default getMaterialsFromDb;
