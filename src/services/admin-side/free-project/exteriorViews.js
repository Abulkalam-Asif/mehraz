const addEditExteriorViewService = (currentExteriorView, showAlert) => {
  const formattedData = {
    name: currentExteriorView.name.trim().toUpperCase(),
    description: currentExteriorView.description.trim(),
    video: currentExteriorView.video,
  };

  if (formattedData.name === "") {
    showAlert({ type: "warning", message: "Please enter name" });
    return false;
  } else if (formattedData.description === "") {
    showAlert({ type: "warning", message: "Please enter description" });
    return false;
  } else if (formattedData.video === null) {
    showAlert({ type: "warning", message: "Please attach a video" });
    return false;
  }
  return true;
};

export { addEditExteriorViewService };
