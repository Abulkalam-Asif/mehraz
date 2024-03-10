const addEditInteriorViewService = (currentInteriorView, showAlert) => {
  const formattedData = {
    id: currentInteriorView.id,
    name: currentInteriorView.name.trim().toUpperCase(),
    description: currentInteriorView.description.trim(),
    video: currentInteriorView.video,
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

export { addEditInteriorViewService };
