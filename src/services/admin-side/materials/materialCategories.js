import addMaterialCategoryToDb from "@/Firebase/admin-side/materials/material-categories/addMaterialCategoryToDb";
import deleteMaterialCategoryFromDb from "@/Firebase/admin-side/materials/material-categories/deleteMaterialCategoryFromDb";
import updateMaterialCategoryFromDb from "@/Firebase/admin-side/materials/material-categories/updateMaterialCategoryFromDb";

const addNewMaterialCategoryService = (
  materialCategories,
  currentMaterialCategory,
  setShowModalSpinner,
  showAlert,
  hideModal,
) => {
  const formattedData = {
    name: currentMaterialCategory.name.trim().toUpperCase(),
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
  } else {
    setShowModalSpinner(true);
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
  } else {
    setShowModalSpinner(true);
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
