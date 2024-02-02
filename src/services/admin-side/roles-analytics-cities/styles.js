import addStyleToDB from "@/Firebase/Styles Functions/addStyletoFirebase";
import deleteStyleFromDB from "@/Firebase/Styles Functions/deleteStyleFromFirebase";
import updateStyleInDB from "@/Firebase/Styles Functions/updateStyleFromFirebase";

const addNewStyleService = (
  currentStyle,
  styles,
  showAlert,
  setShowModalSpinner,
  hideModal
) => {
  const formattedData = {
    name: currentStyle.name.trim().toUpperCase(),
    image: currentStyle.image,
    usage: currentStyle.usage,
  };

  if (formattedData.name === "") {
    showAlert({ type: "warning", message: "Please enter a style name" });
    return;
  } else if (styles?.some((style) => style.name === formattedData.name)) {
    showAlert({ type: "warning", message: "This style already exists" });
    return;
  } else if (!formattedData.image) {
    showAlert({ type: "warning", message: "Please attach an image" });
    return;
  } else {
    setShowModalSpinner(true);
    addStyleToDB(formattedData)
      .then(() => {
        showAlert({
          type: "success",
          message: "Style added successfully!",
        });
        hideModal();
      })
      .catch(() => {
        showAlert({
          type: "error",
          message: "Something went wrong, please try again later",
        });
      })
      .finally(() => {
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
    image: currentStyle.image,
  };

  if (formattedData.name === "") {
    showAlert({ type: "warning", message: "Please enter a style name" });
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
    updateStyleInDB(formattedData)
    .then(() => {
      showAlert({
        type: "success",
        message: "Style updated successfully!",
      });
      hideModal();
    })
    .catch(() => {
      showAlert({
        type: "error",
        message: "Something went wrong, please try again later",
      });
    })
    .finally(() => {
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
  // TODO (backend): call the delete function. use itemToDelete.id
  deleteStyleFromDB(itemToDelete.id)
    .then(() => {
      showAlert({ type: "success", message: "Style deleted successfully!" });
      hideModal();
    })
    .catch(() => {
      showAlert({
        type: "error",
        message: "Something went wrong, please try again later",
      });
    })
    .finally(() => {
      setShowModalSpinner(false);
    });
};

export { addNewStyleService, editStyleService, deleteStyleService };
