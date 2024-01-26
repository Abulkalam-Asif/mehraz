import addOfficeToDB from "@/Firebase/Office Functions/addOfficeToDB";

const addNewOfficeLocationService = (
  newOfficeLocation,
  showAlert,
  setShowModalSpinner,
  setNewOfficeLocation,
  hideModal
) => {
  const formattedOfficeLocation = {
    ...newOfficeLocation,
    city: newOfficeLocation.city.trim().toUpperCase(),
    address: newOfficeLocation.address.trim(),
    mapsLink: newOfficeLocation?.mapsLink.trim(),
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
        setNewOfficeLocation({
          city: "",
          address: "",
          mapsLink: "",
          image: null,
        });
        hideModal();
      })
      .catch((error) => {
        console.log(error);
        showAlert({
          type: "error",
          message: `Oops! DB Error, Check console`,
        });
        console.log(error);
      })
      .finally(() => {
        setShowModalSpinner(false);
      });
  }
};

export { addNewOfficeLocationService };
