import addMaterialCategoryToDb from "@/Firebase/admin-side/materials/material-categories/addMaterialCategoryToDb";
import deleteMaterialCategoryFromDb from "@/Firebase/admin-side/materials/material-categories/deleteMaterialCategoryFromDb";
import updateMaterialCategoryFromDb from "@/Firebase/admin-side/materials/material-categories/updateMaterialCategoryFromDb";
import fileToFormData from "@/utilities/admin-side/fileToFormData";

const addNewMaterialCategoryService = (
  materialCategories,
  currentMaterialCategory,
  setShowModalSpinner,
  showAlert,
  hideModal,
) => {
  const formattedData = {
    name: currentMaterialCategory.name.trim().toUpperCase(),
    image: currentMaterialCategory.image,
    coverImage: currentMaterialCategory.coverImage,
    fixCoverImage: currentMaterialCategory.fixCoverImage,
  };
  if (formattedData.name === "") {
    showAlert({ type: "WARNING", message: "Please enter a category name" });
    return;
  } else if (
    materialCategories.some(
      materialCategory => materialCategory.name === formattedData.name,
    )
  ) {
    showAlert({ type: "ERROR", message: "This category already exists" });
    return;
  } else if (!formattedData.image) {
    showAlert({ type: "ERROR", message: "Please attach an image" });
    return;
  } else if (formattedData.fixCoverImage && !formattedData.coverImage) {
    showAlert({ type: "ERROR", message: "Please attach a cover image" });
    return;
  } else {
    setShowModalSpinner(true);
    if (formattedData.image instanceof File) {
      formattedData.image = fileToFormData("image", formattedData.image);
    }
    if (formattedData.coverImage instanceof File) {
      formattedData.coverImage = fileToFormData(
        "coverImage",
        formattedData.coverImage,
      );
    }
    addMaterialCategoryToDb(formattedData).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

const editMaterialCategoryService = (
  materialCategories,
  currentMaterialCategory,
  setShowModalSpinner,
  showAlert,
  hideModal,
) => {
  const formattedData = {
    id: currentMaterialCategory.id,
    name: currentMaterialCategory.name.trim().toUpperCase(),
    image: currentMaterialCategory.image,
    coverImage: currentMaterialCategory.coverImage,
    fixCoverImage: currentMaterialCategory.fixCoverImage,
  };
  if (formattedData.name === "") {
    showAlert({ type: "WARNING", message: "Please enter a category name" });
    return;
  } else if (
    materialCategories.some(
      materialCategory =>
        materialCategory.name === formattedData.name &&
        materialCategory.id !== formattedData.id,
    )
  ) {
    showAlert({ type: "ERROR", message: "This category already exists" });
    return;
  } else if (!formattedData.image) {
    showAlert({ type: "ERROR", message: "Please attach an image" });
    return;
  } else if (formattedData.fixCoverImage && !formattedData.coverImage) {
    showAlert({ type: "ERROR", message: "Please attach a cover image" });
    return;
  } else {
    setShowModalSpinner(true);
    if (formattedData.image instanceof File) {
      formattedData.image = fileToFormData("image", formattedData.image);
    }
    if (formattedData.coverImage instanceof File) {
      formattedData.coverImage = fileToFormData(
        "coverImage",
        formattedData.coverImage,
      );
    }
    updateMaterialCategoryFromDb(formattedData).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

const deleteMaterialCategoryService = (
  itemToDelete,
  setShowModalSpinner,
  showAlert,
  hideModal,
) => {
  setShowModalSpinner(true);
  deleteMaterialCategoryFromDb(itemToDelete.id).then(({ type, message }) => {
    showAlert({ type, message });
    hideModal();
    setShowModalSpinner(false);
  });
};

export {
  addNewMaterialCategoryService,
  editMaterialCategoryService,
  deleteMaterialCategoryService,
};
