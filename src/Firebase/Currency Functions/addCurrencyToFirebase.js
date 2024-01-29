import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const addCurrencyToDB = async ({ name, valueInPkr, cities, usage }) => {
  const ref = collection(db, "Currency");
  // TODO (backend): update usage.currencies in cities collection
  return addDoc(ref, {
    name,
    valueInPkr,
    cities,
    usage,
  }).catch((err) => {
    console.error("Firebase Error: " + err);
  });
};

export default addCurrencyToDB;
