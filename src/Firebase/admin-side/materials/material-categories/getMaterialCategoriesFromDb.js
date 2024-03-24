"use server";
import { collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const useMaterialCategoriesFromDb = async () => {
  try {
    const categoriesRef = collection(db, "MATERIAL_CATEGORIES");
    return new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(
        categoriesRef,
        dataQuery => {
          const arr = [];
          const promises = [];
          dataQuery.forEach(doc => {
            const materialCategory = {
              id: doc.id,
              name: doc.data().name,
              fixCoverImage: doc.data().fixCoverImage,
              fixedMaterialId: doc.data().fixedMaterialId,
            };
            const coverImageRef = ref(storage, `MATERIAL_CATEGORIES/${doc.id}`);
            promises.push(
              getDownloadURL(coverImageRef)
                .then(url => {
                  materialCategory.coverImage = url;
                })
                .catch(error => {
                  materialCategory.coverImage = null;
                }),
            );
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

export default useMaterialCategoriesFromDb;
