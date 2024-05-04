const addEditRPExteriorViewService = (currentExteriorView, showAlert) => {
  const formattedData = {
    id: currentExteriorView.id,
    name: currentExteriorView.name.trim().toUpperCase(),
    description: currentExteriorView.description.trim(),
    option: currentExteriorView.option,
    video: currentExteriorView.video,
    isUploaded: currentExteriorView.isUploaded || false,
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

export { addEditRPExteriorViewService };
