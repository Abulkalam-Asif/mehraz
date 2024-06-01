"use server";
import { collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "@/Firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";

const getMaterialCategoriesFromDb = async (
  fields = ["id", "name", "fixCoverImage", "fixedMaterialId", "coverImage"],
) => {
  try {
    const categoriesRef = collection(db, "MATERIAL_CATEGORIES");
    return new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(
        categoriesRef,
        dataQuery => {
          const arr = [];
          const promises = [];
          dataQuery.forEach(doc => {
            const materialCategory = {};
            fields.forEach(field => {
              if (field === "id") {
                materialCategory[field] = doc.id;
              } else if (field === "image") {
                const imageRef = ref(
                  storage,
                  `MATERIAL_CATEGORIES/${doc.id}/image`,
                );
                promises.push(
                  getDownloadURL(imageRef)
                    .then(url => {
                      materialCategory[field] = url;
                    })
                    .catch(error => {
                      materialCategory[field] = null;
                    }),
                );
              } else if (field === "coverImage" || field === "image") {
                const coverImageRef = ref(
                  storage,
                  `MATERIAL_CATEGORIES/${doc.id}/cover`,
                );
                promises.push(
                  getDownloadURL(coverImageRef)
                    .then(url => {
                      materialCategory[field] = url;
                    })
                    .catch(error => {
                      materialCategory[field] = null;
                    }),
                );
              } else {
                materialCategory[field] = doc.data()[field];
              }
            });
            arr.push(materialCategory);
          });
          unsubscribe();
          Promise.all(promises).then(() => resolve(arr));
        },
        error => {
          unsubscribe();
          reject(error);
        },
      );
    });
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export default getMaterialCategoriesFromDb;
