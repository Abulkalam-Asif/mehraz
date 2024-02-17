import addCityToDB from "@/Firebase/cities/addCityToFirebase";
import deleteCityFromDB from "@/Firebase/cities/deleteCityFromFirebase";
import updateCityInDB from "@/Firebase/cities/updateCityFromFirebase";

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
    addCityToDB(formattedData).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
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
    updateCityInDB(formattedData).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

const deleteCityService = async (
  itemToDelete,
  setShowModalSpinner,
  showAlert,
  hideModal
) => {
  setShowModalSpinner(true);
  deleteCityFromDB(itemToDelete.id).then(({ type, message }) => {
    showAlert({ type, message });
    hideModal();
    setShowModalSpinner(false);
  });
};

export { addNewCityService, editCityService, deleteCityService };
