import addStyleToDB from "@/Firebase/Styles Functions/addStyletoFirebase";

const addNewStyleService = (
  newStyle,
  styles,
  showAlert,
  setNewStyle,
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
    addStyleToDB(newStyle)
			.then(() => {
				showAlert({
					type: "success",
					message: "Style added successfully!",
				});
				setNewStyle({
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
