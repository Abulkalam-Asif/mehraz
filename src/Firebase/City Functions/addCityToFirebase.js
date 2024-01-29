import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const addCityToDB = async ({ name, usage }) => {
  const ref = collection(db, "City");
  return addDoc(ref, {
    name,
    usage,
  }).catch((err) => {
    console.error("Firebase Error: " + err);
  });
};

export default addCityToDB;
