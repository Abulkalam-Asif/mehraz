const addEditExteriorViewService = (currentExteriorView, showAlert) => {
  const formattedData = {
    id: currentExteriorView.id,
    name: currentExteriorView.name.trim().toUpperCase(),
    description: currentExteriorView.description.trim(),
    video: currentExteriorView.video,
  };

  if (formattedData.name === "") {
    showAlert({ type: "WARNING", message: "Please enter name" });
    return null;
  } else if (formattedData.description === "") {
    showAlert({ type: "WARNING", message: "Please enter description" });
    return null;
  } else if (formattedData.video === null) {
    showAlert({ type: "WARNING", message: "Please attach a video" });
    return null;
  }
  return formattedData;
};

export { addEditExteriorViewService };
