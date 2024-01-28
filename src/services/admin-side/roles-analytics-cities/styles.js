import addStyleToDB from "@/Firebase/Styles Functions/addStyletoFirebase";

const addNewStyleService = (
  currentStyle,
  styles,
  showAlert,
  setCurrentStyle,
  setShowModalSpinner,
  hideModal
) => {
  const formattedName = currentStyle.name.trim().toUpperCase();

  if (formattedName === "") {
    showAlert({ type: "warning", message: "Please enter a style name" });
    return;
  } else if (styles && styles.some((style) => style.name === formattedName)) {
    showAlert({ type: "warning", message: "This style already exists" });
    return;
  } else if (!currentStyle.image) {
    showAlert({ type: "warning", message: "Please attach an image" });
    return;
  } else {
    setShowModalSpinner(true);
    addStyleToDB(currentStyle)
      .then(() => {
        showAlert({
          type: "success",
          message: "Style added successfully!",
        });
        setCurrentStyle({
          name: "",
          image: null,
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

export { addNewStyleService };
