import { RACInputBox, RACModal } from "@/components";

const PlotModal = ({
  currentPlot,
  currentPlotInputHandler,
  addNewPlotHandler,
  editPlotHandler,
  modalMetadata,
}) => {
  return (
    <>
      <RACModal
        heading={modalMetadata.action === "add" ? "Add plot" : "Edit plot"}
        buttonText={modalMetadata.action === "add" ? "Add plot" : "Update plot"}
        onButtonClick={
          modalMetadata.action === "add" ? addNewPlotHandler : editPlotHandler
        }
        className={"flex items-center gap-8"}>
        <RACInputBox
          label="Enter area value"
          value={currentPlot.area}
          inputHandler={currentPlotInputHandler}
          idHtmlFor="area"
          name="area"
          type="number"
        />
        <RACInputBox
          label="Enter area unit"
          value={currentPlot.unit}
          inputHandler={currentPlotInputHandler}
          idHtmlFor="unit"
          name="unit"
        />
      </RACModal>
    </>
  );
};

export default PlotModal;
