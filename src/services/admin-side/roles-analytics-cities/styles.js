const addNewStyleService = (
  newStyle,
  styles,
  showAlert,
  setShowModalSpinner,
  hideModal
) => {
  const formattedName = newStyle.name.trim().toUpperCase();

  if (formattedName === "") {
    showAlert({ type: "warning", message: "Please enter a style name" });
    return;
  } else if (styles && styles.some((style) => style.name === formattedName)) {
    showAlert({ type: "warning", message: "This style already exists" });
    return;
  } else if (!newStyle.image) {
    showAlert({ type: "warning", message: "Please attach an image" });
    return;
  } else {
    setShowModalSpinner(true);
    // TODO (Backend): Add style to DB
  }
};

export { addNewStyleService };
