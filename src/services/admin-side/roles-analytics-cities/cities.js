import addCityToDB from "@/Firebase/City Functions/addCityToFirebase";

const addNewCityService = (
  cities,
  currentCity,
  setCurrentCity,
  setShowModalSpinner,
  showAlert,
  hideModal
) => {
  const formattedCity = currentCity.trim().toUpperCase();

  if (formattedCity === "") {
    showAlert({ type: "warning", message: "Please enter a city name" });
    return;
  } else if (cities?.includes(formattedCity)) {
    showAlert({ type: "error", message: "This city already exists" });
    return;
  } else {
    setShowModalSpinner(true);
    addCityToDB(formattedCity)
      .then(() => {
        showAlert({ type: "success", message: "City added successfully!" });
        setCurrentCity("");
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

const editCityService = () => {
};

export { addNewCityService, editCityService };
