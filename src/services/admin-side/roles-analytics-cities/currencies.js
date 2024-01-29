import addCurrencyToDB from "@/Firebase/Currency Functions/addCurrencyToFirebase";

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
  } else if (currentCurrency.valueInPkr <= 0) {
    showAlert({ type: "warning", message: "Please enter a valid PKR value" });
  } else if (currentCurrency.cities.length === 0) {
    showAlert({
      type: "warning",
      message: "Please select at least one city",
    });
  } else {
    setShowModalSpinner(true);
    addCurrencyToDB(formattedData)
      .then(() => {
        showAlert({
          type: "success",
          message: "Currency added successfully!",
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

const editCurrencyService = (
  currentCurrency,
  currencies,
  showAlert,
  setShowModalSpinner,
  hideModal
) => {
  const formattedCurrencyName = currentCurrency.name.trim().toUpperCase();

  if (formattedCurrencyName === "") {
    showAlert({ type: "warning", message: "Please enter a currency name" });
    return;
  } else if (
    currencies.find(
      (currency) =>
        currency.name === formattedCurrencyName &&
        currency.id !== currentCurrency.id
    )
  ) {
    showAlert({ type: "error", message: "This currency already exists" });
    return;
  } else if (
    currentCurrency.valueInPkr <= 0 ||
    currentCurrency.valueInPkr === ""
  ) {
    showAlert({ type: "warning", message: "Please enter a valid PKR value" });
  } else if (currentCurrency.cities.length === 0) {
    showAlert({
      type: "warning",
      message: "Please select at least one city",
    });
  } else {
    setShowModalSpinner(true);
    // TODO (backend): call the update function. use currentCurrency.id to determine which currency to update. Follow the add function above
    // .then(() => {
    //   showAlert({
    //     type: "success",
    //     message: "Currency updated successfully!",
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

export { addNewCurrencyService, editCurrencyService };
