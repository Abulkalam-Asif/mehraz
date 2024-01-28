import addPlotToDB from "@/Firebase/Plots/addPlotToFirebase";

const addNewPlotService = (
  currentPlot,
  setCurrentPlot,
  showAlert,
  plots,
  setShowModalSpinner,
  toggleModal
) => {
  const formattedUnit = currentPlot.unit.trim().toUpperCase();
  if (currentPlot.area <= 0) {
    showAlert({ type: "warning", message: "Please enter valid area value" });
    return;
  } else if (formattedUnit === "") {
    showAlert({ type: "warning", message: "Please enter a unit" });
    return;
  } else if (
    plots?.find(
      (plot) => plot.area === currentPlot.area && plot.unit === formattedUnit
    )
  ) {
    showAlert({
      type: "warning",
      message: "A Plot with these values already exists",
    });
    return;
  } else {
    setShowModalSpinner(true);
    addPlotToDB(currentPlot.area, formattedUnit)
      .then(() => {
        showAlert({
          type: "success",
          message: "Plot added successfully",
        });
        setCurrentPlot({ area: 0, unit: "" });
        toggleModal();
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

export { addNewPlotService };
