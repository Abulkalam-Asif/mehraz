import addStyleToDB from "@/Firebase/Styles Functions/addStyletoFirebase";

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
  const formattedName = currentStyle.name.trim().toUpperCase();

  if (formattedName === "") {
    showAlert({ type: "warning", message: "Please enter a style name" });
    return;
  } else if (
    styles &&
    styles.some(
      (style) => style.name === formattedName && style.id !== currentStyle.id
    )
  ) {
    showAlert({ type: "warning", message: "This style already exists" });
    return;
  } else if (!currentStyle.image) {
    showAlert({ type: "warning", message: "Please attach an image" });
    return;
  } else {
    setShowModalSpinner(true);
    // TODO (backend): call the update function. use currentStyle.id to determine which style to update. Follow the add function above
    // Note: currentStyle.image will be a file if the user changed the image, as in the add function, otherwise it will be the link of the image which was retrieved from the firebase

    // .then(() => {
    //   showAlert({
    //     type: "success",
    //     message: "Style updated successfully!",
    //   });
    //   hideModal();
    // })
    // .catch(() => {
    //   showAlert({
    //     type: "error",
    //     message: "Something went wrong, please try again later",
    //   });
    // })
    // .finally(() => {
    //   setShowModalSpinner(false);
    // });
  }
};

export { addNewStyleService, editStyleService };
