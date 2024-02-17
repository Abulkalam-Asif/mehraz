import deleteOfficeFromDB from "@/Firebase/Office Functions/deleteOfficeFromFirebase";
import addOfficeToDB from "@/Firebase/Office Functions/addOfficeToDB";
import updateOfficeInDB from "@/Firebase/Office Functions/updateOfficeFromFirebase";
import fileToFormData from "@/utils/fileToFormData";

const addNewOfficeLocationService = (
  currentOfficeLocation,
  showAlert,
  setShowModalSpinner,
  hideModal,
  officeLocations
) => {
  const formattedData = {
    name: currentOfficeLocation.name.trim().toUpperCase(),
    address: currentOfficeLocation.address.trim(),
    mapsLink: currentOfficeLocation?.mapsLink.trim(),
    image: currentOfficeLocation.image,
  };

  if (formattedData.name === "") {
    showAlert({ type: "warning", message: "Please enter office name" });
    return;
  } else if (
    officeLocations.some((office) => office.name === formattedData.name)
  ) {
    showAlert({ type: "warning", message: "This office name already exists" });
    return;
  } else if (formattedData.address === "") {
    showAlert({ type: "warning", message: "Please enter an address" });
    return;
  } else if (formattedData?.mapsLink === "") {
    showAlert({ type: "warning", message: "Please enter a maps link" });
    return;
  } else if (!formattedData?.mapsLink.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/)) {
    showAlert({ type: "warning", message: "Please enter a valid maps link" });
    return;
  } else if (!formattedData.image) {
    showAlert({ type: "warning", message: "Please attach an image" });
    return;
  } else {
    setShowModalSpinner(true);
    // Converting image to FormData to pass to Server Action
    formattedData.image = fileToFormData("image", formattedData.image);

    addOfficeToDB(formattedData).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

const editOfficeLocationService = (
  currentOfficeLocation,
  showAlert,
  setShowModalSpinner,
  hideModal
) => {
  const formattedData = {
    id: currentOfficeLocation.id,
    name: currentOfficeLocation.name.trim().toUpperCase(),
    address: currentOfficeLocation.address.trim(),
    mapsLink: currentOfficeLocation?.mapsLink.trim(),
    image: currentOfficeLocation.image,
  };

  if (formattedData.name === "") {
    showAlert({ type: "warning", message: "Please enter office name" });
    return;
  } else if (formattedData.address === "") {
    showAlert({ type: "warning", message: "Please enter an address" });
    return;
  } else if (formattedData?.mapsLink === "") {
    showAlert({ type: "warning", message: "Please enter a maps link" });
    return;
  } else if (!formattedData?.mapsLink.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/)) {
    showAlert({ type: "warning", message: "Please enter a valid maps link" });
    return;
  } else if (!formattedData.image) {
    showAlert({ type: "warning", message: "Please attach an image" });
    return;
  } else {
    setShowModalSpinner(true);
    // Converting image to FormData if it is a File to pass to Server Action
    if (formattedData.image instanceof File) {
      formattedData.image = fileToFormData("image", formattedData.image);
    }

    updateOfficeInDB(formattedData).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

const deleteOfficeLocationService = (
  itemToDelete,
  setShowModalSpinner,
  showAlert,
  hideModal
) => {
  setShowModalSpinner(true);
  deleteOfficeFromDB(itemToDelete.id).then(({ type, message }) => {
    showAlert({ type, message });
    hideModal();
    setShowModalSpinner(false);
  });
};

export {
  addNewOfficeLocationService,
  editOfficeLocationService,
  deleteOfficeLocationService,
};
