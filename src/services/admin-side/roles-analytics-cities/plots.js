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
        setShowModalSpinner(false);
        setNewPlot({ area: 0, unit: "" });
        toggleModal();
      })
      .catch((err) => {
        showAlert({
          type: "error",
          message: "Something went wrong! Please try again later",
        });
        // TODO: Conside a proper error to display to the user
      });
  }
};

export { addNewPlotService };
