import addOfficeToDB from "@/Firebase/Office Functions/addOfficeToDB";

const addNewOfficeLocationService = (
  currentOfficeLocation,
  showAlert,
  setShowModalSpinner,
  hideModal
) => {
  const formattedData = {
    city: currentOfficeLocation.city.trim().toUpperCase(),
    address: currentOfficeLocation.address.trim(),
    mapsLink: currentOfficeLocation?.mapsLink.trim(),
    image: currentOfficeLocation.image,
  };

  if (formattedData.city === "") {
    showAlert({ type: "warning", message: "Please enter a city name" });
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
    addOfficeToDB(formattedData)
      .then(() => {
        showAlert({
          type: "success",
          message: "Office added successfully!",
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

const editOfficeLocationService = (
  currentOfficeLocation,
  showAlert,
  setShowModalSpinner,
  hideModal
) => {
  const formattedData = {
    id: currentOfficeLocation.id,
    city: currentOfficeLocation.city.trim().toUpperCase(),
    address: currentOfficeLocation.address.trim(),
    mapsLink: currentOfficeLocation?.mapsLink.trim(),
    image: currentOfficeLocation.image,
  };

  if (formattedData.city === "") {
    showAlert({ type: "warning", message: "Please enter a city name" });
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
    // TODO (backend): call the update function. Follow the add function
    // Note: formattedData.image will be a file if the user changed the image, as in the add function, otherwise it will be the link of the image which was retrieved from the firebase

    // .then(() => {
    //   showAlert({
    //     type: "success",
    //     message: "Office updated successfully!",
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

export { addNewOfficeLocationService, editOfficeLocationService };
