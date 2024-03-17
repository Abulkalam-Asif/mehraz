import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
const fetchFreeProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "FREE_PROJECTS"));
    if (!querySnapshot.empty) {
      const projects = [];
      querySnapshot.forEach(doc => {
        const documentData = doc.data();
        projects.push({
          id: doc.id,
          ...documentData,
          date_created: documentData.date_created.toDate(),
        });
      });
      return projects;
    } else {
      console.error("No FREE_PROJECTS found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching FREE_PROJECTS from DB:", error);
    return [];
  }
};
export default fetchFreeProjects;
