import addFreeProjectS1ToDb from "@/Firebase/admin-side/free-project/addFreeProjectS1ToDb";
import fileToFormData from "@/utilities/admin-panel/fileToFormData";

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
  };
  if (formattedData.title === "") {
    showAlert({ type: "WARNING", message: "Please enter a title" });
  } else if (formattedData.city === "") {
    showAlert({ type: "WARNING", message: "Please select a city" });
  } else if (formattedData.area === "") {
    showAlert({ type: "WARNING", message: "Please select an area" });
  } else if (formattedData.budget === "") {
    showAlert({ type: "WARNING", message: "Please select budget" });
  } else if (formattedData.description === "") {
    showAlert({ type: "WARNING", message: "Please enter description" });
  } else if (formattedData.construction_cost === "") {
    showAlert({ type: "WARNING", message: "Please enter a construction cost" });
  } else if (formattedData.keywords.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please enter at least one keyword",
    });
  } else if (!formattedData.image) {
    showAlert({ type: "WARNING", message: "Please attach an image" });
  } else if (!formattedData.video) {
    showAlert({ type: "WARNING", message: "Please attach a video" });
  } else {
    setShowSpinner(true);
    // Converting image to FormData to pass to Server Action
    formattedData.image = fileToFormData("image", formattedData.image);
    formattedData.video = fileToFormData("video", formattedData.video);
    return new Promise((resolve) => {
      addFreeProjectS1ToDb(formattedData).then(({ data, type, message }) => {
        showAlert({ type, message });
        setShowSpinner(false);
        resolve(data);
      });
    });
  }
};

export default addFreeProjectS1Service;
