import getAllRPDesignsData from "@/Firebase/admin-side/ready_project/getFunctions/getAllRPDesignsData";
import { getScreen1Data } from "@/Firebase/admin-side/ready_project/getFunctions/getRPScreen1Data";
import { getRPScreen2Data } from "@/Firebase/admin-side/ready_project/getFunctions/getRPScreen2Data";
import { getRPScreen2SideData } from "@/Firebase/admin-side/ready_project/getFunctions/getRPScreen2SideData";
import { getRPScreen3Data } from "@/Firebase/admin-side/ready_project/getFunctions/getRPScreen3Data";
import getUploadedDesigns from "@/Firebase/admin-side/ready_project/getFunctions/getUploadedDesigns";

// When the user reloads the page, this function will fetch the data for the current screen
const getScreenDataOnReload = async (
  currentScreen,
  projectId,
  setReadyProjectS1,
  setScreen1PrevData,
  setScreen2PrevData,
  setReadyProjectS3,
  showAlert,
  setRpDesignsData,
  setUploadedDesigns,
) => {
  try {
    switch (currentScreen) {
      case 1: {
        const projectData = await getScreen1Data(projectId);
        setReadyProjectS1(projectData);
        setScreen1PrevData({
          areas: projectData.areas,
          floors: projectData.floors,
        });
        return true;
      }
      case 2: {
        const projectData = await getRPScreen2Data(projectId);
        setScreen1PrevData({
          areas: projectData.areas,
          floors: projectData.floors,
        });
        setScreen2PrevData({
          combinations: projectData.combinations,
          budgetRanges: projectData.budgetRanges,
        });
        return true;
      }
      case 3: {
        const projectData = await getRPScreen3Data(projectId);
        setReadyProjectS3(projectData);
        return true;
      }
      case 4: {
        const designs = await getAllRPDesignsData(projectId);
        setRpDesignsData(designs);
        const uploadedDesigns = await getUploadedDesigns(projectId);
        setUploadedDesigns(uploadedDesigns);
        return true;
      }
      default: {
        return false;
      }
    }
  } catch (error) {
    showAlert({
      type: "ERROR",
      message: error.message,
    });
    return false;
  }
};

export const getScreen2SideData = async (
  projectId,
  setScreen1PrevData,
  showAlert,
) => {
  try {
    const projectData = await getRPScreen2SideData(projectId);
    setScreen1PrevData({
      areas: projectData.areas,
      floors: projectData.floors,
    });
    return true;
  } catch (error) {
    showAlert({
      type: "ERROR",
      message: error.message,
    });
    return false;
  }
};

export default getScreenDataOnReload;
