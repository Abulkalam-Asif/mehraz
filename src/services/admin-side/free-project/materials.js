const addEditMaterialService = (currentMaterial, showAlert) => {
  const formattedData = {
    id: currentMaterial.id,
    name: currentMaterial.name.trim().toUpperCase(),
    vendor: currentMaterial.vendor.trim().toUpperCase(),
    rate: Number(currentMaterial.rate),
    image: currentMaterial.image,
  };

  if (formattedData.name === "") {
    showAlert({ type: "WARNING", message: "Please enter name" });
    return null;
  } else if (formattedData.vendor === "") {
    showAlert({ type: "WARNING", message: "Please enter vendor name" });
    return null;
  } else if (formattedData.rate <= 0) {
    showAlert({ type: "WARNING", message: "Please enter valid rate" });
    return null;
  } else if (formattedData.image === null) {
    showAlert({ type: "WARNING", message: "Please attach an image" });
    return null;
  }
  return formattedData;
};

export { addEditMaterialService };
