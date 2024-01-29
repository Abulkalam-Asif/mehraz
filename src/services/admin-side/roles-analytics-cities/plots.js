import addPlotToDB from "@/Firebase/Plots/addPlotToFirebase";

const addNewPlotService = (
  currentPlot,
  showAlert,
  plots,
  setShowModalSpinner,
  toggleModal
) => {
  const formattedData = {
    area: Number(currentPlot.area),
    unit: currentPlot.unit.trim().toUpperCase(),
    usage: currentPlot.usage,
  };

  if (formattedData.area <= 0) {
    showAlert({ type: "warning", message: "Please enter valid area value" });
    return;
  } else if (formattedData.unit === "") {
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
    addPlotToDB(formattedData)
      .then(() => {
        showAlert({
          type: "success",
          message: "Plot added successfully",
        });
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

const editPlotService = (
  currentPlot,
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
    // TODO (backend): call the update function. use currentPlot.id to determine which plot to update. Follow the add function above
    // .then(() => {
    //   showAlert({
    //     type: "success",
    //     message: "Plot updated successfully",
    //   });
    //   toggleModal();
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

export { addNewPlotService, editPlotService };
