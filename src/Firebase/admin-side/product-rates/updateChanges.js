"use server";
import { db } from "@/Firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const updateChanges = async changes => {
  const changesCollection = collection(db, "CHANGES");
  try {
    const promises = [];
    promises.push(
      changes?.map(async change => {
        const changeDocRef = doc(changesCollection, change.id);
        await setDoc(changeDocRef, {
          changes: change.changes,
          rate: change.rate,
        });
      }),
    );
    await Promise.all(promises || []);
    return {
      type: "SUCCESS",
      message: "Changes updated successfully.",
    };
  } catch (error) {
    console.error("Error updating changes: ", error);
    return {
      type: "ERROR",
      message: "Something went wrong, please try again later.",
    };
  }
};

export default updateChanges;
