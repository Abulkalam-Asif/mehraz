"use server";
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
      return [];
    }
  } catch (error) {
    console.error("Error fetching READY_PROJECTS from DB:", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};
export default fetchReadyProjects;
