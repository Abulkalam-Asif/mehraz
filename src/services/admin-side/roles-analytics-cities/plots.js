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
      (plot) =>
        plot.area === formattedData.area && plot.unit === formattedData.unit
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
  const formattedData = {
    id: currentPlot.id,
    area: Number(currentPlot.area),
    unit: currentPlot.unit.trim().toUpperCase(),
  };

  if (formattedData.area <= 0) {
    showAlert({ type: "warning", message: "Please enter valid area value" });
    return;
  } else if (formattedData.unit === "") {
    showAlert({ type: "warning", message: "Please enter a unit" });
    return;
  } else if (
    plots?.find(
      (plot) =>
        plot.area === formattedData.area && plot.unit === formattedData.unit
    )
  ) {
    showAlert({
      type: "warning",
      message: "A Plot with these values already exists",
    });
    return;
  } else {
    setShowModalSpinner(true);
    // TODO (backend): call the update function. Follow the add function
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
