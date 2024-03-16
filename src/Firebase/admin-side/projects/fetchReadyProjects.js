import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
const fetchReadyProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "READY_PROJECTS"));
    if (!querySnapshot.empty) {
      const projects = [];
      querySnapshot.forEach((doc) => {
        const documentData = doc.data();
        projects.push({
          id: doc.id,
          ...documentData,
          date_created: documentData.date_created.toDate(),
        });
      });
      return projects;
    } else {
      console.error("No READY_PROJECTS found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching READY_PROJECTS from DB:", error);
    return [];
  }
};
export default fetchReadyProjects;
