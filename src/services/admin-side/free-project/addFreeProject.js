import addFreeProjectS1ToDb from "@/Firebase/admin-side/free-project/addFreeProjectS1ToDb";
import fileToFormData from "@/utils/fileToFormData";

const addFreeProjectS1Service = (freeProject, showAlert, setShowSpinner) => {
  const formattedData = {
    title: freeProject.title.trim().toUpperCase(),
    city: freeProject.city.trim(),
    area: freeProject.area.trim(),
    budget: freeProject.budget.trim().toUpperCase(),
    description: freeProject.description.trim(),
    construction_cost: freeProject.construction_cost.trim().toUpperCase(),
    keywords: freeProject.keywords,
    image: freeProject.image,
    video: freeProject.video,
    isComplete: freeProject.isComplete,
  };
  if (formattedData.title === "") {
    showAlert({ type: "warning", message: "Please enter a title" });
  } else if (formattedData.city === "") {
    showAlert({ type: "warning", message: "Please select a city" });
  } else if (formattedData.area === "") {
    showAlert({ type: "warning", message: "Please select an area" });
  } else if (formattedData.budget === "") {
    showAlert({ type: "warning", message: "Please select budget" });
  } else if (formattedData.description === "") {
    showAlert({ type: "warning", message: "Please enter description" });
  } else if (formattedData.construction_cost === "") {
    showAlert({ type: "warning", message: "Please enter a construction cost" });
  } else if (formattedData.keywords.length === 0) {
    showAlert({
      type: "warning",
      message: "Please enter at least one keyword",
    });
  } else if (!formattedData.image) {
    showAlert({ type: "warning", message: "Please attach an image" });
  } else if (!formattedData.video) {
    showAlert({ type: "warning", message: "Please attach a video" });
  } else {
    setShowSpinner(true);
    // Converting image to FormData to pass to Server Action
    formattedData.image = fileToFormData("image", formattedData.image);
    formattedData.video = fileToFormData("video", formattedData.video);
    addFreeProjectS1ToDb(formattedData).then(({ data, type, message }) => {
      showAlert({ type, message });
      setShowSpinner(false);
      return data;
    });
  }
};

export default addFreeProjectS1Service;
