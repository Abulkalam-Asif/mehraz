const addNewPlotService = (newPlot, showAlert, plots, setShowModalSpinner) => {
  const formattedUnit = newPlot.unit.trim().toUpperCase();
  if (newPlot.area <= 0) {
    showAlert({ type: "warning", message: "Please enter valid area value" });
    return;
  } else if (formattedUnit === "") {
    showAlert({ type: "warning", message: "Please enter a unit" });
    return;
  } else if (
    plots?.find(
      (plot) => plot.area === newPlot.area && plot.unit === formattedUnit
    )
  ) {
    showAlert({
      type: "warning",
      message: "A Plot with these values already exists",
    });
    return;
  } else {
    setShowModalSpinner(true);
    // TODO: Add new plot to DB
  }
};

export { addNewPlotService };
