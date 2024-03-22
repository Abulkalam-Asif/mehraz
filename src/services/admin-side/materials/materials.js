import addNewMaterialToDb from "@/Firebase/admin-side/materials/materials/addNewMaterialToDb";
import updateMaterialFromDb from "@/Firebase/admin-side/materials/materials/updateMaterialFromDb";
import fileToFormData from "@/utilities/admin-panel/fileToFormData";

const addNewMaterialService = (
  materials,
  currentMaterial,
  setShowModalSpinner,
  showAlert,
  hideModal,
) => {
  const trimmedSpecs = currentMaterial.specs.map(spec => spec.trim());
  const formattedData = {
    isFixed: currentMaterial.isFixed,
    name: currentMaterial.name.trim().toUpperCase(),
    vendor: currentMaterial.vendor.trim().toUpperCase(),
    rate: Number(currentMaterial.rate),
    category: currentMaterial.category.trim(),
    description: currentMaterial.description.trim(),
    specs: trimmedSpecs
      .filter(spec => spec !== "")
      .concat(trimmedSpecs.filter(spec => spec === "")),
    orderedAs: currentMaterial.orderedAs.trim().toUpperCase(),
    image: currentMaterial.image,
    cover: currentMaterial.cover,
    displayCover: currentMaterial.displayCover,
    usage: {
      projects: Number(currentMaterial.usage.projects),
    },
  };

  if (formattedData.name === "") {
    showAlert({ type: "WARNING", message: "Material name is required." });
  } else if (materials.some(material => material.name === formattedData.name)) {
    showAlert({ type: "WARNING", message: "Material already exists." });
  } else if (formattedData.vendor === "") {
    showAlert({ type: "WARNING", message: "Vendor name is required." });
  } else if (formattedData.rate <= 0) {
    showAlert({ type: "WARNING", message: "Please enter valid value." });
  } else if (formattedData.category === "") {
    showAlert({ type: "WARNING", message: "Please select a category." });
  } else if (formattedData.description === "") {
    showAlert({ type: "WARNING", message: "Please enter description." });
  } else if (formattedData.specs.length === 0) {
    showAlert({ type: "WARNING", message: "Please enter at least one spec." });
  } else if (formattedData.orderedAs === "") {
    showAlert({ type: "WARNING", message: "Please enter ordered as." });
  } else if (formattedData.image === null) {
    showAlert({ type: "WARNING", message: "Please select an image." });
  } else if (formattedData.cover === null) {
    showAlert({ type: "WARNING", message: "Please select a cover image." });
  } else {
    setShowModalSpinner(true);
    // Converting image to FormData
    formattedData.image = fileToFormData("image", formattedData.image);
    formattedData.cover = fileToFormData("cover", formattedData.cover);

    addNewMaterialToDb(formattedData).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

const editMaterialService = (
  materials,
  currentMaterial,
  setShowModalSpinner,
  showAlert,
  hideModal,
) => {
  const trimmedSpecs = currentMaterial.specs.map(spec => spec.trim());
  const formattedData = {
    id: currentMaterial.id,
    isFixed: currentMaterial.isFixed,
    name: currentMaterial.name.trim().toUpperCase(),
    vendor: currentMaterial.vendor.trim().toUpperCase(),
    rate: Number(currentMaterial.rate),
    category: currentMaterial.category.trim(),
    description: currentMaterial.description.trim(),
    displayCover: currentMaterial.displayCover,
    specs: trimmedSpecs
      .filter(spec => spec !== "")
      .concat(trimmedSpecs.filter(spec => spec === "")),
    orderedAs: currentMaterial.orderedAs.trim().toUpperCase(),
    image: currentMaterial.image,
    cover: currentMaterial.cover,
  };

  if (formattedData.name === "") {
    showAlert({ type: "WARNING", message: "Material name is required." });
  } else if (
    materials.some(
      material =>
        material.name === formattedData.name &&
        material.id !== currentMaterial.id,
    )
  ) {
    showAlert({ type: "WARNING", message: "Material already exists." });
  } else if (formattedData.vendor === "") {
    showAlert({ type: "WARNING", message: "Vendor name is required." });
  } else if (formattedData.rate <= 0) {
    showAlert({ type: "WARNING", message: "Please enter valid value." });
  } else if (formattedData.category === "") {
    showAlert({ type: "WARNING", message: "Please select a category." });
  } else if (formattedData.description === "") {
    showAlert({ type: "WARNING", message: "Please enter description." });
  } else if (formattedData.specs.length === 0) {
    showAlert({ type: "WARNING", message: "Please enter at least one spec." });
  } else if (formattedData.orderedAs === "") {
    showAlert({ type: "WARNING", message: "Please enter ordered as." });
  } else if (formattedData.image === null) {
    showAlert({ type: "WARNING", message: "Please select an image." });
  } else if (formattedData.cover === null) {
    showAlert({ type: "WARNING", message: "Please select a cover image." });
  } else {
    setShowModalSpinner(true);
    // Converting image to FormData
    if (formattedData.image instanceof File) {
      formattedData.image = fileToFormData("image", formattedData.image);
    }
    if (formattedData.cover instanceof File) {
      formattedData.cover = fileToFormData("cover", formattedData.cover);
    }
    updateMaterialFromDb(formattedData).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

export { addNewMaterialService, editMaterialService };
