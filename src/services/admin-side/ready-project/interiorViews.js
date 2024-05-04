const addEditRPInteriorViewService = (currentInteriorView, showAlert) => {
  const formattedData = {
    id: currentInteriorView.id,
    name: currentInteriorView.name.trim().toUpperCase(),
    description: currentInteriorView.description.trim(),
    option: currentInteriorView.option,
    video: currentInteriorView.video,
    isUploaded: currentInteriorView.isUploaded || false,
  };

  if (formattedData.name === "") {
    showAlert({ type: "WARNING", message: "Please enter name" });
    return null;
  } else if (formattedData.description === "") {
    showAlert({ type: "WARNING", message: "Please enter description" });
    return null;
  } else if (formattedData.option === "") {
    showAlert({ type: "WARNING", message: "Please select option" });
    return null;
  } else if (formattedData.video === null) {
    showAlert({ type: "WARNING", message: "Please attach a video" });
    return null;
  }
  return formattedData;
};

export { addEditRPInteriorViewService };
