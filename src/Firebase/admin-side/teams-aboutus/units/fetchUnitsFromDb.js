import { db } from "@/Firebase/firebase";
import { getDocs, collection } from "firebase/firestore";

const useFetchUnitsFromDb = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "UNITS"));
    if (!querySnapshot.empty) {
      const units = [];
      querySnapshot.forEach(doc => {
        const documentData = doc.data();
        units.push({
          id: doc.id,
          ...documentData,
        });
      });
      return units;
    } else {
      console.error("No UNITS found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching UNITS from DB:", error);
    return [];
  }
};

export default useFetchUnitsFromDb;
