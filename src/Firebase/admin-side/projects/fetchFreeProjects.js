"use server";
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
          type: "FREE_PROJECT",
          dateCreated: doc.data().dateCreated.toDate(),
        };
        projects.push(project);
      });
      return projects;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching FREE_PROJECTS from DB:", error);
    throw new Error(
      "An error occurred while fetching data. Please check your internet connection and try again.",
    );
  }
};

export default fetchFreeProjects;
