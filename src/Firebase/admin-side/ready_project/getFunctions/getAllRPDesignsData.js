"use server";
import { db } from "@/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import getRPDesignData from "./getRPDesignData";

const getAllRPDesignsData = async projectId => {
  const projectRef = doc(db, "READY_PROJECTS", projectId);
  try {
    const projectDoc = await getDoc(projectRef);
    const designIds = (await projectDoc.data().designs) || [];
    const designs = await Promise.all(
      designIds.map(async id => await getRPDesignData(id)),
    );
    return designs;
  } catch (error) {
    console.error("Error getting all the ready project designs: ", error);
    return null;
  }
};

export default getAllRPDesignsData;
