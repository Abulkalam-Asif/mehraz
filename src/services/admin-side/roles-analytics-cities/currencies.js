import addCurrencyToDB from "@/Firebase/Currency Functions/addCurrencyToFirebase";

const addNewCurrencyService = (
  currentCurrency,
  currencies,
  showAlert,
  setShowModalSpinner,
  setCurrentCurrency,
  hideModal,
  defaultCurrency
) => {
  const formattedCurrencyName = currentCurrency.name.trim().toUpperCase();

  if (formattedCurrencyName === "") {
    showAlert({ type: "warning", message: "Please enter a currency name" });
    return;
  } else if (
    currencies.find((currency) => currency.name === formattedCurrencyName)
  ) {
    showAlert({ type: "error", message: "This currency already exists" });
    return;
  } else if (currentCurrency.inPkr <= 0 || currentCurrency.inPkr === "") {
    showAlert({ type: "warning", message: "Please enter a valid PKR value" });
  } else if (currentCurrency.cities.length === 0) {
    showAlert({
      type: "warning",
      message: "Please select at least one city",
    });
  } else {
    setShowModalSpinner(true);
    addCurrencyToDB(
      formattedCurrencyName,
      currentCurrency.inPkr,
      currentCurrency.cities
    )
      .then(() => {
        showAlert({
          type: "success",
          message: "Currency added successfully!",
        });
        setCurrentCurrency(defaultCurrency);
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

export { addNewCurrencyService };
