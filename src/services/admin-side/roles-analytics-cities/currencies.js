import addCurrencyToDB from "@/Firebase/Currency Functions/addCurrencyToFirebase";
import deleteCurrencyFromDB from "@/Firebase/Currency Functions/deleteCurrencyFromFirebase";
import updateCurrencyInDB from "@/Firebase/Currency Functions/updateCurrencyFromFirebase";

const addNewCurrencyService = (
  currentCurrency,
  currencies,
  showAlert,
  setShowModalSpinner,
  hideModal
) => {
  const formattedData = {
    name: currentCurrency.name.trim().toUpperCase(),
    valueInPkr: Number(currentCurrency.valueInPkr),
    cities: currentCurrency.cities,
    usage: currentCurrency.usage,
  };

  if (formattedData.name === "") {
    showAlert({ type: "warning", message: "Please enter a currency name" });
    return;
  } else if (
    currencies?.find((currency) => currency.name === formattedData.name)
  ) {
    showAlert({ type: "error", message: "This currency already exists" });
    return;
  } else if (formattedData.valueInPkr <= 0) {
    showAlert({ type: "warning", message: "Please enter a valid PKR value" });
  } else if (formattedData.cities.length === 0) {
    showAlert({
      type: "warning",
      message: "Please select at least one city",
    });
  } else {
    setShowModalSpinner(true);
    addCurrencyToDB(formattedData).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

const editCurrencyService = (
  currentCurrency,
  prevCities,
  currencies,
  showAlert,
  setShowModalSpinner,
  hideModal
) => {
  const formattedData = {
    id: currentCurrency.id,
    name: currentCurrency.name.trim().toUpperCase(),
    valueInPkr: Number(currentCurrency.valueInPkr),
    cities: currentCurrency.cities,
  };

  if (formattedData.name === "") {
    showAlert({ type: "warning", message: "Please enter a currency name" });
    return;
  } else if (
    currencies.find(
      (currency) =>
        currency.name === formattedData.name && currency.id !== formattedData.id
    )
  ) {
    showAlert({ type: "error", message: "This currency already exists" });
    return;
  } else if (formattedData.valueInPkr <= 0) {
    showAlert({ type: "warning", message: "Please enter a valid PKR value" });
  } else if (formattedData.cities.length === 0) {
    showAlert({
      type: "warning",
      message: "Please select at least one city",
    });
  } else {
    setShowModalSpinner(true);
    updateCurrencyInDB(formattedData, prevCities).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

const deleteCurrencyService = (
  itemToDelete,
  setShowModalSpinner,
  showAlert,
  hideModal
) => {
  setShowModalSpinner(true);
  deleteCurrencyFromDB(itemToDelete.id).then(({ type, message }) => {
    showAlert({ type, message });
    hideModal();
    setShowModalSpinner(false);
  });
};

export { addNewCurrencyService, editCurrencyService, deleteCurrencyService };
