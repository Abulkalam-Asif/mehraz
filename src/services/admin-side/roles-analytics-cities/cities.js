import addCityToDB from "@/Firebase/City Functions/addCityToFirebase";

const addNewCityService = (
  newCity,
  setNewCity,
  setShowModalSpinner,
  showAlert,
  hideModal
) => {
  const formattedCity = newCity.trim().toUpperCase();

  if (formattedCity === "") {
    showAlert({ type: "warning", message: "Please enter a city name" });
    return;
  } else if (cities.includes(formattedCity)) {
    showAlert({ type: "error", message: "This city already exists" });
    return;
  } else {
    setShowModalSpinner(true);
    addCityToDB(formattedCity)
      .then(() => {
        showAlert({ type: "success", message: "City added successfully" });
        setShowModalSpinner(false);
        setNewCity("");
        hideModal();
      })
      .catch(() => {
        showAlert({
          type: "error",
          message: "An error occured! Please try again.",
        });
        setShowModalSpinner(false);
      });
  }
};

const editCityService = (setModalContent, toggleModal) => {
  setModalContent("city");
  toggleModal();
};

export { addNewCityService, editCityService };
