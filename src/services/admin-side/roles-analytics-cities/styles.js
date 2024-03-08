import addStyleToDB from "@/Firebase/styles/addStyletoFirebase";
import deleteStyleFromDB from "@/Firebase/styles/deleteStyleFromFirebase";
import updateStyleInDB from "@/Firebase/styles/updateStyleFromFirebase";
import fileToFormData from "@/utilities/admin-panel/fileToFormData";

const addNewStyleService = (
  currentStyle,
  styles,
  showAlert,
  setShowModalSpinner,
  hideModal
) => {
  const formattedData = {
    name: currentStyle.name.trim().toUpperCase(),
    budget: currentStyle.budget,
    image: currentStyle.image,
    usage: currentStyle.usage,
  };

  if (formattedData.name === "") {
    showAlert({ type: "warning", message: "Please enter a style name" });
    return;
  } else if (!["LOW", "MEDIUM", "HIGH"].includes(formattedData.budget)) {
    showAlert({ type: "warning", message: "Please select budget" });
    return;
  } else if (styles?.some((style) => style.name === formattedData.name)) {
    showAlert({ type: "warning", message: "This style already exists" });
    return;
  } else if (!formattedData.image) {
    showAlert({ type: "warning", message: "Please attach an image" });
    return;
  } else {
    setShowModalSpinner(true);
    // Converting image to FormData to pass to Server Action
    formattedData.image = fileToFormData("image", formattedData.image);

    addStyleToDB(formattedData).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

const editStyleService = (
  currentStyle,
  styles,
  showAlert,
  setShowModalSpinner,
  hideModal
) => {
  const formattedData = {
    id: currentStyle.id,
    name: currentStyle.name.trim().toUpperCase(),
    budget: currentStyle.budget,
    image: currentStyle.image,
  };

  if (formattedData.name === "") {
    showAlert({ type: "warning", message: "Please enter a style name" });
    return;
  } else if (!["LOW", "MEDIUM", "HIGH"].includes(formattedData.budget)) {
    showAlert({ type: "warning", message: "Please select budget" });
    return;
  } else if (
    styles?.some(
      (style) =>
        style.name === formattedData.name && style.id !== formattedData.id
    )
  ) {
    showAlert({ type: "warning", message: "This style already exists" });
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

    updateStyleInDB(formattedData).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

const deleteStyleService = (
  itemToDelete,
  setShowModalSpinner,
  showAlert,
  hideModal
) => {
  setShowModalSpinner(true);
  deleteStyleFromDB(itemToDelete.id).then(({ type, message }) => {
    showAlert({ type, message });
    hideModal();
    setShowModalSpinner(false);
  });
};

export { addNewStyleService, editStyleService, deleteStyleService };
