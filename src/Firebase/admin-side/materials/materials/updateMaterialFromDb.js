"use server";
import { db, storage } from "@/Firebase/firebase";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { revalidatePath } from "next/cache";
import {
  collection,
  getDocs,
  where,
  query,
  setDoc,
  doc,
  increment,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const updateMaterialFromDb = async ({
  id,
  isFixed,
  name,
  vendor,
  rate,
  category,
  description,
  displayCover,
  specs,
  orderedAs,
  image,
  cover,
}) => {
  try {
    const materialsCollectionRef = collection(db, "MATERIALS");
    const queryResult = await getDocs(
      query(materialsCollectionRef, where("name", "==", name)),
    );
    if (!queryResult.empty) {
      const existingMaterial = queryResult.docs[0];
      if (existingMaterial.id !== id) {
        return {
          type: "ERROR",
          message: "Material with this name already exists.",
        };
      }
    }

    // Update images
    if (image instanceof FormData) {
      const imageRef = ref(storage, `MATERIALS/${id}/image`);
      await deleteObject(imageRef);
      await uploadBytes(imageRef, image.get("image"));
    }
    if (cover instanceof FormData) {
      const coverRef = ref(storage, `MATERIALS/${id}/cover`);
      await deleteObject(coverRef);
      await uploadBytes(coverRef, cover.get("cover"));
    }

    // Get some of the previous values
    const docRef = doc(materialsCollectionRef, id);
    const docSnap = await getDoc(docRef);
    const previousCategory = docSnap.data().category;
    // Update material
    await updateDoc(docRef, {
      name,
      vendor,
      rate,
      category,
      description,
      displayCover,
      specs,
      orderedAs,
    });

    // Update fixed material
    if (category === previousCategory) {
      const categoryRef = doc(collection(db, "MATERIAL_CATEGORIES"), category);
      const categoryDoc = await getDoc(categoryRef);
      const previouslyFixedMaterial = categoryDoc.data().fixedMaterial;
      if (previouslyFixedMaterial === id && !isFixed) {
        // If the material was previously fixed and is no longer fixed
        await updateDoc(categoryRef, {
          fixedMaterial: null,
        });
      } else if (previouslyFixedMaterial !== id && isFixed) {
        // If the material was not fixed and is now fixed
        await updateDoc(categoryRef, {
          fixedMaterial: id,
        });
      }
    } else {
      const previousCategoryRef = doc(
        collection(db, "MATERIAL_CATEGORIES"),
        previousCategory,
      );
      const categoryRef = doc(collection(db, "MATERIAL_CATEGORIES"), category);
      // If the category is changed, update the usage of the categories
      updateDoc(previousCategoryRef, {
        usage: increment(-1),
      });
      updateDoc(categoryRef, {
        usage: increment(1),
      });
      const previousCategoryDoc = await getDoc(previousCategoryRef);
      // If the previous category had this material as fixed, update it
      if (previousCategoryDoc.data().fixedMaterial === id) {
        await updateDoc(previousCategoryRef, {
          fixedMaterial: null,
        });
      }
      // If the new category has this material as fixed, update it
      if (isFixed) {
        await updateDoc(categoryRef, {
          fixedMaterial: id,
        });
      }
    }
    revalidatePath("/admin/materials", "page");
    return { type: "SUCCESS", message: "Material updated successfully." };
  } catch (error) {
    console.error("Error updating material: ", error);
    return { type: "ERROR", message: "An error occurred. Please try again." };
  }
};

export default updateMaterialFromDb;
