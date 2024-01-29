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
  } else if (formattedData.valueInPkr <= 0) {
    showAlert({ type: "warning", message: "Please enter a valid PKR value" });
  } else if (formattedData.cities.length === 0) {
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
    // TODO (backend): call the update function. Follow the add function
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
