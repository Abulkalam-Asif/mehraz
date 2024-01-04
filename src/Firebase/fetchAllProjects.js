import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";
const fetchAllProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Project"));
    if (!querySnapshot.empty) {
      const allProjects = [];
      querySnapshot.forEach((doc) => {
        const documentData = doc.data();
        allProjects.push({ id: doc.id, data: documentData });
      });
      return allProjects;
    } else {
      console.error("No Projects Found in the DB");
      return [];
    }
  } catch (error) {
    console.error("Error fetching Projects from DB:", error);
    return [];
  }
};
export default fetchAllProjects;
