import { InputBox, RolesAnalyticsCitiesModal } from "@/components";

const PlotModal = ({
  currentPlot,
  currentPlotInputHandler,
  addNewPlotHandler,
  showModalSpinner,
  modalMetadata
}) => {
  return (
    <>
      <RolesAnalyticsCitiesModal
        heading={modalMetadata.action === "add" ? "Add plot" : "Edit plot"}
        buttonText={modalMetadata.action === "add" ? "Add plot" : "Update plot"}
        onButtonClick={addNewPlotHandler}
        className={"flex items-center gap-8"}
        showModalSpinner={showModalSpinner}>
        <InputBox
          label="Enter area value"
          value={currentPlot.area}
          inputHandler={currentPlotInputHandler}
          idHtmlFor="area"
          name="area"
          type="number"
        />
        <InputBox
          label="Enter area unit"
          value={currentPlot.unit}
          inputHandler={currentPlotInputHandler}
          idHtmlFor="unit"
          name="unit"
        />
      </RolesAnalyticsCitiesModal>
    </>
  );
};

export default PlotModal;
