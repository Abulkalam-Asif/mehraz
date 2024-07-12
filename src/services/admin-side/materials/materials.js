import addNewMaterialToDb from "@/Firebase/admin-side/materials/materials/addNewMaterialToDb";
import deleteMaterialFromDb from "@/Firebase/admin-side/materials/materials/deleteMaterialFromDb";
import updateMaterialFromDb from "@/Firebase/admin-side/materials/materials/updateMaterialFromDb";
import fileToFormData from "@/utilities/admin-side/fileToFormData";

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
    image1: currentMaterial.image1,
    image2: currentMaterial.image2,
    cities: currentMaterial.cities,
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
  } else if (
    formattedData.specs.filter(spec => spec.length !== 0).length === 0
  ) {
    showAlert({ type: "WARNING", message: "Please enter at least one spec." });
  } else if (formattedData.orderedAs === "") {
    showAlert({ type: "WARNING", message: "Please enter ordered as." });
  } else if (formattedData.image1 === null) {
    showAlert({ type: "WARNING", message: "Please attach image 1." });
  } else if (formattedData.image2 === null) {
    showAlert({ type: "WARNING", message: "Please attach image 2." });
  } else if (formattedData.cities.length === 0) {
    showAlert({ type: "WARNING", message: "Please select at least one city." });
  } else {
    setShowModalSpinner(true);
    // Converting image to FormData
    formattedData.image1 = fileToFormData("image1", formattedData.image1);
    formattedData.image2 = fileToFormData("image2", formattedData.image2);

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
    specs: trimmedSpecs
      .filter(spec => spec !== "")
      .concat(trimmedSpecs.filter(spec => spec === "")),
    orderedAs: currentMaterial.orderedAs.trim().toUpperCase(),
    image1: currentMaterial.image1,
    image2: currentMaterial.image2,
    cities: currentMaterial.cities,
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
  } else if (
    formattedData.specs.filter(spec => spec.length !== 0).length === 0
  ) {
    showAlert({ type: "WARNING", message: "Please enter at least one spec." });
  } else if (formattedData.orderedAs === "") {
    showAlert({ type: "WARNING", message: "Please enter ordered as." });
  } else if (formattedData.image1 === null) {
    showAlert({ type: "WARNING", message: "Please attach image 1." });
  } else if (formattedData.image2 === null) {
    showAlert({ type: "WARNING", message: "Please attach image 2." });
  } else if (formattedData.cities.length === 0) {
    showAlert({ type: "WARNING", message: "Please select at least one city." });
  } else {
    setShowModalSpinner(true);
    // Converting image to FormData
    if (formattedData.image1 instanceof File) {
      formattedData.image1 = fileToFormData("image1", formattedData.image1);
    }
    if (formattedData.image2 instanceof File) {
      formattedData.image2 = fileToFormData("image2", formattedData.image2);
    }
    updateMaterialFromDb(formattedData).then(response => {
      showAlert({ type: response.type, message: response.message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

const deleteMaterialService = (
  itemToDelete,
  setShowModalSpinner,
  showAlert,
  hideModal,
) => {
  setShowModalSpinner(true);
  deleteMaterialFromDb(itemToDelete.id).then(({ type, message }) => {
    showAlert({ type, message });
    hideModal();
    setShowModalSpinner(false);
  });
};

export { addNewMaterialService, editMaterialService, deleteMaterialService };
