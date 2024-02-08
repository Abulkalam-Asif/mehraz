import addCityToDB from "@/Firebase/City Functions/addCityToFirebase";
import deleteCityFromDB from "@/Firebase/City Functions/deleteCityFromFirebase";
import updateCityInDB from "@/Firebase/City Functions/updateCityFromFirebase";

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
  const formattedData = {
    id: currentCity.id,
    name: currentCity.name.trim().toUpperCase(),
  };

  if (formattedData.name === "") {
    showAlert({ type: "warning", message: "Please enter a city name" });
    return;
  } else if (cities.some((city) => city.name === formattedData.name)) {
    showAlert({ type: "error", message: "This city already exists" });
    return;
  } else {
    setShowModalSpinner(true);
    updateCityInDB(currentCity)
      .then(() => {
        showAlert({ type: "success", message: "City updated successfully!" });
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

const deleteCityService = (
  itemToDelete,
  setShowModalSpinner,
  showAlert,
  hideModal
) => {
  setShowModalSpinner(true);
  deleteCityFromDB(itemToDelete.id)
    .then(() => {
      showAlert({ type: "success", message: "City deleted successfully!" });
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
};

export { addNewCityService, editCityService, deleteCityService };
