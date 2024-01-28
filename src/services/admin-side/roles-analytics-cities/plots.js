import addPlotToDB from "@/Firebase/Plots/addPlotToFirebase";

const addNewPlotService = (
  newPlot,
  setNewPlot,
  showAlert,
  plots,
  setShowModalSpinner,
  toggleModal
) => {
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
    addPlotToDB(newPlot.area, formattedUnit)
      .then(() => {
        showAlert({
          type: "success",
          message: "Plot added successfully",
        });
        setNewPlot({ area: 0, unit: "" });
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
