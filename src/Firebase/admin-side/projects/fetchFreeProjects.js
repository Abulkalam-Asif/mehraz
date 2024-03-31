import { getDocs, collection } from "firebase/firestore";
import { db } from "@/Firebase/firebase";

const fetchFreeProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "FREE_PROJECTS"));
    if (!querySnapshot.empty) {
      const projects = [];
      querySnapshot.forEach(doc => {
        const project = {
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          isCompleted: doc.data().isCompleted,
          type: "FREE_PROJECT",
          dateCreated: doc.data().dateCreated.toDate(),
        };
        projects.push(project);
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
