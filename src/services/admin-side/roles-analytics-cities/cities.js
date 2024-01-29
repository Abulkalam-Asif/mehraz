import addCityToDB from "@/Firebase/City Functions/addCityToFirebase";

const addNewCityService = (
  cities,
  currentCity,
  setShowModalSpinner,
  showAlert,
  hideModal
) => {
  const formattedData = {
    name: currentCity.name.trim().toUpperCase(),
    usage: currentCity.usage,
  };

  if (formattedData.name === "") {
    showAlert({ type: "warning", message: "Please enter a city name" });
    return;
  } else if (cities.some((city) => city.name === formattedData.name)) {
    showAlert({ type: "error", message: "This city already exists" });
    return;
  } else {
    setShowModalSpinner(true);
    addCityToDB(formattedData)
      .then(() => {
        showAlert({ type: "success", message: "City added successfully!" });
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

const editCityService = (
  cities,
  currentCity,
  setShowModalSpinner,
  showAlert,
  hideModal
) => {
  const formattedCityName = currentCity.name.trim().toUpperCase();

  if (formattedCityName === "") {
    showAlert({ type: "warning", message: "Please enter a city name" });
    return;
  } else if (
    cities.some(
      (city) => city.name === formattedCityName && city.id !== currentCity.id
    )
  ) {
    showAlert({ type: "error", message: "This city already exists" });
    return;
  } else {
    // setShowModalSpinner(true);
    // TODO (backend): call the update function. use currentCity.id to determine which city to update. Follow the add function above
    //   .then(() => {
    //     showAlert({ type: "success", message: "City updated successfully!" });
    //     hideModal();
    //   })
    //   .catch(() => {
    //     showAlert({
    //       type: "error",
    //       message: "Something went wrong, please try again later",
    //     });
    //   })
    //   .finally(() => {
    //     setShowModalSpinner(false);
    //   });
  }
};

export { addNewCityService, editCityService };
