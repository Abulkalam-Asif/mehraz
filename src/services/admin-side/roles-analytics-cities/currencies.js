import addCurrencyToDB from "@/Firebase/Currency Functions/addCurrencyToFirebase";

const addNewCurrencyService = (
  newCurrency,
  currencies,
  showAlert,
  setShowModalSpinner,
  setNewCurrency,
  hideModal,
  defaultCurrency
) => {
  const formattedCurrencyName = newCurrency.name.trim().toUpperCase();

  if (formattedCurrencyName === "") {
    showAlert({ type: "warning", message: "Please enter a currency name" });
    return;
  } else if (
    currencies.find((currency) => currency.name === formattedCurrencyName)
  ) {
    showAlert({ type: "error", message: "This currency already exists" });
    return;
  } else if (newCurrency.inPkr <= 0 || newCurrency.inPkr === "") {
    showAlert({ type: "warning", message: "Please enter a valid PKR value" });
  } else if (newCurrency.cities.length === 0) {
    showAlert({
      type: "warning",
      message: "Please select at least one city",
    });
  } else {
    setShowModalSpinner(true);
    addCurrencyToDB(
      formattedCurrencyName,
      newCurrency.inPkr,
      newCurrency.cities
    )
      .then(() => {
        showAlert({
          type: "success",
          message: "Currency added successfully!",
        });
        setNewCurrency(defaultCurrency);
        hideModal();
      })
      .catch(() => {
        showAlert({
          type: "error",
          message: "An error occured! Please try again.",
        });
        // TODO: Decide whether to show custom error or the one from firebase
      })
      .finally(() => {
        setShowModalSpinner(false);
      });
  }
};

export { addNewCurrencyService };
