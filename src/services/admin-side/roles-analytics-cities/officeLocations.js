import addOfficeToDB from "@/Firebase/Office Functions/addOfficeToDB";

const addNewOfficeLocationService = (
  currentOfficeLocation,
  showAlert,
  setShowModalSpinner,
  setCurrentOfficeLocation,
  hideModal
) => {
  const formattedOfficeLocation = {
    ...currentOfficeLocation,
    city: currentOfficeLocation.city.trim().toUpperCase(),
    address: currentOfficeLocation.address.trim(),
    mapsLink: currentOfficeLocation?.mapsLink.trim(),
  };

  if (formattedOfficeLocation.city === "") {
    showAlert({ type: "warning", message: "Please enter a city name" });
    return;
  } else if (formattedOfficeLocation.address === "") {
    showAlert({ type: "warning", message: "Please enter an address" });
    return;
  } else if (formattedOfficeLocation?.mapsLink === "") {
    showAlert({ type: "warning", message: "Please enter a maps link" });
    return;
  } else if (
    !formattedOfficeLocation?.mapsLink.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/)
  ) {
    showAlert({ type: "warning", message: "Please enter a valid maps link" });
    return;
  } else if (!formattedOfficeLocation.image) {
    showAlert({ type: "warning", message: "Please attach an image" });
    return;
  } else {
    setShowModalSpinner(true);
    addOfficeToDB(formattedOfficeLocation)
      .then(() => {
        showAlert({
          type: "success",
          message: "Office added successfully!",
        });
        setCurrentOfficeLocation({
          city: "",
          address: "",
          mapsLink: "",
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

export { addNewOfficeLocationService };
