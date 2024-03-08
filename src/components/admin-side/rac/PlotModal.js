import { AdminInputBox, AdminModal } from "@/components";

const PlotModal = ({
  currentPlot,
  currentPlotInputHandler,
  addNewPlotHandler,
  editPlotHandler,
  modalMetadata,
}) => {
  return (
    <>
      <AdminModal
        heading={modalMetadata.action === "add" ? "Add plot" : "Edit plot"}
        buttonText={modalMetadata.action === "add" ? "Add plot" : "Update plot"}
        onButtonClick={
          modalMetadata.action === "add" ? addNewPlotHandler : editPlotHandler
        }
        className={"flex items-center gap-8"}>
        <AdminInputBox
          label="Enter area value"
          value={currentPlot.area}
          inputHandler={currentPlotInputHandler}
          idHtmlFor="area"
          name="area"
          type="number"
        />
        <AdminInputBox
          label="Enter area unit"
          value={currentPlot.unit}
          inputHandler={currentPlotInputHandler}
          idHtmlFor="unit"
          name="unit"
        />
      </AdminModal>
    </>
  );
};

export default PlotModal;
