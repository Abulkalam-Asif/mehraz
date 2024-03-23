import addNewPropertyToDb from "@/Firebase/admin-side/materials/properties/addNewPropertyToDb";
import deletePropertyFromDb from "@/Firebase/admin-side/materials/properties/deletePropertyFromDb";
import updatePropertyFromDb from "@/Firebase/admin-side/materials/properties/updatePropertyFromDb";

const addNewPropertyService = (
  currentProperty,
  setShowModalSpinner,
  showAlert,
  hideModal,
) => {
  const formattedData = {
    area: currentProperty.area.trim().toUpperCase(),
    description: currentProperty.description.trim(),
    location: currentProperty.location.trim(),
    demand: currentProperty.demand.trim().toUpperCase(),
    city: currentProperty.city,
    type: currentProperty.type,
  };
  if (formattedData.area === "") {
    showAlert({ type: "WARNING", message: "Area is required" });
    return;
  } else if (formattedData.description === "") {
    showAlert({ type: "WARNING", message: "Description is required" });
    return;
  } else if (formattedData.location === "") {
    showAlert({ type: "WARNING", message: "Location is required" });
    return;
  } else if (formattedData.demand === "") {
    showAlert({ type: "WARNING", message: "Demand is required" });
    return;
  } else if (formattedData.city === "") {
    showAlert({ type: "WARNING", message: "City is required" });
    return;
  } else if (formattedData.type === "") {
    showAlert({ type: "WARNING", message: "Type is required" });
    return;
  }
  setShowModalSpinner(true);
  addNewPropertyToDb(formattedData).then(({ type, message }) => {
    showAlert({ type, message });
    hideModal();
    setShowModalSpinner(false);
  });
};

const editPropertyService = (
  currentProperty,
  setShowModalSpinner,
  showAlert,
  hideModal,
) => {
  const formattedData = {
    id: currentProperty.id,
    area: currentProperty.area.trim().toUpperCase(),
    description: currentProperty.description.trim(),
    location: currentProperty.location.trim(),
    demand: currentProperty.demand.trim().toUpperCase(),
    city: currentProperty.city,
    type: currentProperty.type,
  };
  if (formattedData.area === "") {
    showAlert({ type: "WARNING", message: "Area is required" });
    return;
  } else if (formattedData.description === "") {
    showAlert({ type: "WARNING", message: "Description is required" });
    return;
  } else if (formattedData.location === "") {
    showAlert({ type: "WARNING", message: "Location is required" });
    return;
  } else if (formattedData.demand === "") {
    showAlert({ type: "WARNING", message: "Demand is required" });
    return;
  } else if (formattedData.city === "") {
    showAlert({ type: "WARNING", message: "City is required" });
    return;
  } else if (formattedData.type === "") {
    showAlert({ type: "WARNING", message: "Type is required" });
    return;
  }
  setShowModalSpinner(true);
  updatePropertyFromDb(formattedData).then(({ type, message }) => {
    showAlert({ type, message });
    hideModal();
    setShowModalSpinner(false);
  });
};

const deletePropertyService = (
  itemToDelete,
  setShowModalSpinner,
  showAlert,
  hideModal,
) => {
  setShowModalSpinner(true);
  deletePropertyFromDb(itemToDelete.id).then(({ type, message }) => {
    showAlert({ type, message });
    hideModal();
    setShowModalSpinner(false);
  });
};

export { addNewPropertyService, editPropertyService, deletePropertyService };
