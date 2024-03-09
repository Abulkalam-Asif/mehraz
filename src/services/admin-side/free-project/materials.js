const addEditMaterialService = (currentMaterial, showAlert) => {
  const formattedData = {
    name: currentMaterial.name.trim().toUpperCase(),
    vendor: currentMaterial.vendor.trim().toUpperCase(),
    rate: currentMaterial.rate,
    image: currentMaterial.image,
  };

  if (formattedData.name === "") {
    showAlert({ type: "WARNING", message: "Please enter name" });
    return false;
  } else if (formattedData.vendor === "") {
    showAlert({ type: "WARNING", message: "Please enter vendor name" });
    return false;
  } else if (formattedData.rate <= 0) {
    showAlert({ type: "WARNING", message: "Please enter valid rate" });
    return false;
  } else if (formattedData.image === null) {
    showAlert({ type: "WARNING", message: "Please attach an image" });
    return false;
  }
  return true;
};

export { addEditMaterialService };
