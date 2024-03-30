import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

const fetchFreeProjects = async (fields = ["id", "date_created"]) => {
  try {
    const querySnapshot = await getDocs(collection(db, "FREE_PROJECTS"));
    if (!querySnapshot.empty) {
      const projects = [];
      querySnapshot.forEach(doc => {
        const project = {};
        fields.forEach(field => {
          if (field === "id") {
            project[field] = doc.id;
          } else if (field === "date_created") {
            project[field] = doc.data().date_created.toDate();
          } else {
            project[field] = doc.data()[field];
          }
        });
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
