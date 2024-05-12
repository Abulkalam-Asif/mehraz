import { getDocs, collection } from "firebase/firestore";
import { db } from "@/Firebase/firebase";
const fetchReadyProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "READY_PROJECTS"));
    if (!querySnapshot.empty) {
      const projects = [];
      querySnapshot.forEach(doc => {
        const project = {
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          type: "READY_PROJECT",
          dateCreated: doc.data().dateCreated.toDate(),
          uploadedScreensCount: doc.data().uploadedScreensCount,
        };
        projects.push(project);
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
