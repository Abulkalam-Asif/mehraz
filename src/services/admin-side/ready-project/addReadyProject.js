import addReadyProjectS1ToDB from "@/Firebase/admin-side/ready_project/addReadyProjectScreen-1";
import fileToFormData from "@/utilities/admin-panel/fileToFormData";

const addReadyProjectS1Service = (
  readyProjectS1,
  showAlert,
  setShowSpinner,
) => {
  const formattedData = {
    title: readyProjectS1.title.trim().toUpperCase(),
    budget: readyProjectS1.budget,
    description: readyProjectS1.description.trim(),
    cities: readyProjectS1.cities,
    areas: readyProjectS1.areas,
    floors: readyProjectS1.floors,
    units: readyProjectS1.units,
    style: readyProjectS1.style,
    constructionRates: readyProjectS1.constructionRates.map(rate =>
      rate.trim(),
    ),
    productRates: readyProjectS1.productRates.map(rate => rate.trim()),
    keywords: readyProjectS1.keywords.map(keyword => keyword.trim()),
    image: readyProjectS1.image,
    video: readyProjectS1.video,
  };
  if (formattedData.title.length === 0) {
    showAlert({ type: "WARNING", message: "Title is required" });
    return;
  } else if (formattedData.budget.length === 0) {
    showAlert({ type: "WARNING", message: "Budget is required" });
    return;
  } else if (formattedData.description.length === 0) {
    showAlert({ type: "WARNING", message: "Description is required" });
    return;
  } else if (formattedData.cities.length === 0) {
    showAlert({ type: "WARNING", message: "Please select at least one city" });
    return;
  } else if (formattedData.areas.length === 0) {
    showAlert({ type: "WARNING", message: "Please select at least one area" });
    return;
  } else if (formattedData.floors.length === 0) {
    showAlert({ type: "WARNING", message: "Please select at least one floor" });
    return;
  } else if (formattedData.units.length === 0) {
    showAlert({ type: "WARNING", message: "Please select at least one unit" });
    return;
  } else if (formattedData.style.length === 0) {
    showAlert({ type: "WARNING", message: "Style is required" });
    return;
  } else if (formattedData.constructionRates.some(rate => rate.length === 0)) {
    showAlert({
      type: "WARNING",
      message: "Construction rates are required",
    });
    return;
  } else if (formattedData.productRates.some(rate => rate.length === 0)) {
    showAlert({ type: "WARNING", message: "Product rates are required" });
    return;
  } else if (formattedData.keywords.length === 0) {
    showAlert({
      type: "WARNING",
      message: "Please enter at least one keyword",
    });
    return;
  } else if (!formattedData.image) {
    showAlert({ type: "WARNING", message: "Please attach an image" });
    return;
  } else if (!formattedData.video) {
    showAlert({ type: "WARNING", message: "Please attach a video" });
    return;
  } else {
    setShowSpinner(true);
    // Convert image and video to FormData
    formattedData.image = fileToFormData("image", formattedData.image);
    formattedData.video = fileToFormData("video", formattedData.video);
    return new Promise(resolve => {
      addReadyProjectS1ToDB(formattedData).then(({ type, message, data }) => {
        showAlert({ type, message });
        setShowSpinner(false);
        resolve(data);
      });
    });
  }
};

export { addReadyProjectS1Service };
