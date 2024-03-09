import updatePlotInDB from "@/Firebase/plots/updatePlotFromFiresbase";
import deletePlotFromDB from "@/Firebase/plots/deletePlotFromFirebase";
import addPlotToDB from "@/Firebase/plots/addPlotToFirebase";

const addNewPlotService = (
  currentPlot,
  showAlert,
  plots,
  setShowModalSpinner,
  hideModal
) => {
  const formattedData = {
    area: Number(currentPlot.area),
    unit: currentPlot.unit.trim().toUpperCase(),
    usage: currentPlot.usage,
  };

  if (formattedData.area <= 0) {
    showAlert({ type: "WARNING", message: "Please enter valid area value" });
    return;
  } else if (formattedData.unit === "") {
    showAlert({ type: "WARNING", message: "Please enter a unit" });
    return;
  } else if (
    plots?.find(
      (plot) =>
        plot.area === formattedData.area && plot.unit === formattedData.unit
    )
  ) {
    showAlert({
      type: "WARNING",
      message: "A Plot with these values already exists",
    });
    return;
  } else {
    setShowModalSpinner(true);
    addPlotToDB(formattedData).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

const editPlotService = (
  currentPlot,
  showAlert,
  plots,
  setShowModalSpinner,
  hideModal
) => {
  const formattedData = {
    id: currentPlot.id,
    area: Number(currentPlot.area),
    unit: currentPlot.unit.trim().toUpperCase(),
  };

  if (formattedData.area <= 0) {
    showAlert({ type: "WARNING", message: "Please enter valid area value" });
    return;
  } else if (formattedData.unit === "") {
    showAlert({ type: "WARNING", message: "Please enter a unit" });
    return;
  } else if (
    plots?.find(
      (plot) =>
        plot.area === formattedData.area && plot.unit === formattedData.unit
    )
  ) {
    showAlert({
      type: "WARNING",
      message: "A Plot with these values already exists",
    });
    return;
  } else {
    setShowModalSpinner(true);
    updatePlotInDB(formattedData).then(({ type, message }) => {
      showAlert({ type, message });
      hideModal();
      setShowModalSpinner(false);
    });
  }
};

const deletePlotService = (
  itemToDelete,
  setShowModalSpinner,
  showAlert,
  hideModal
) => {
  setShowModalSpinner(true);
  deletePlotFromDB(itemToDelete.id).then(({ type, message }) => {
    showAlert({ type, message });
    hideModal();
    setShowModalSpinner(false);
  });
};

export { addNewPlotService, editPlotService, deletePlotService };
