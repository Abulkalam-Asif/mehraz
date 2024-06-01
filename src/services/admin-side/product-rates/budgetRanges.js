import updateBudgetRanges from "@/Firebase/admin-side/product-rates/updateBudgetRanges";

const updateBudgetRangesService = (
  newBudgetRanges,
  setShowUpdateSpinner,
  showAlert,
) => {
  if (
    newBudgetRanges
      .map(budgetRange => budgetRange.min === 0 || budgetRange.max === 0)
      .includes(true)
  ) {
    return showAlert({ type: "ERROR", message: "Please fill all the fields." });
  } else if (
    newBudgetRanges
      .map(budgetRange => budgetRange.min >= budgetRange.max)
      .includes(true)
  ) {
    return showAlert({
      type: "ERROR",
      message: "Minimum value should be less than maximum value.",
    });
  }

  for (let i = 0; i < newBudgetRanges.length - 1; i++) {
    const currentRange = newBudgetRanges[i];
    const nextRange = newBudgetRanges[i + 1];

    // Check for overlapping ranges
    if (currentRange.max >= nextRange.min) {
      return showAlert({
        type: "ERROR",
        message: "Budget ranges should not overlap.",
      });
    }

    // Check for holes between ranges
    if (currentRange.max + 1 !== nextRange.min) {
      return showAlert({
        type: "ERROR",
        message:
          "There should not be any gaps of more than 1 between budget ranges.",
      });
    }
  }

  setShowUpdateSpinner(true);
  updateBudgetRanges(newBudgetRanges).then(({ type, message }) => {
    setShowUpdateSpinner(false);
    showAlert({ type, message });
  });
};

export default updateBudgetRangesService;
