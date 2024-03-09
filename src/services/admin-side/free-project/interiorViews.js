const addEditInteriorViewService = (currentInteriorView, showAlert) => {
  const formattedData = {
    name: currentInteriorView.name.trim().toUpperCase(),
    description: currentInteriorView.description.trim(),
    video: currentInteriorView.video,
  };

  if (formattedData.name === "") {
    showAlert({ type: "WARNING", message: "Please enter name" });
    return false;
  } else if (formattedData.description === "") {
    showAlert({ type: "WARNING", message: "Please enter description" });
    return false;
  } else if (formattedData.video === null) {
    showAlert({ type: "WARNING", message: "Please attach a video" });
    return false;
  }
  return true;
};

export { addEditInteriorViewService };
