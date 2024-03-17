import { AdminInputBox, AdminModal, AdminRadio, RACSelect } from "@/components";

const PlotModal = ({
  currentPlot,
  currentPlotInputHandler,
  addNewPlotHandler,
  editPlotHandler,
  modalMetadata,
  units,
}) => {
  return (
    <>
      <AdminModal
        heading={modalMetadata.action === "ADD" ? "Add plot" : "Edit plot"}
        buttonText={modalMetadata.action === "ADD" ? "Add plot" : "Update plot"}
        onButtonClick={
          modalMetadata.action === "ADD" ? addNewPlotHandler : editPlotHandler
        }
        className={"flex items-start gap-8"}>
        <div className="space-y-4">
          <AdminInputBox
            label="Enter area value"
            value={currentPlot.area}
            inputHandler={currentPlotInputHandler}
            idHtmlFor="area"
            name="area"
            type="number"
            max={9999999}
          />
          <AdminRadio
            label="Select Category"
            adminRadioValue={currentPlot.category}
            inputHandler={currentPlotInputHandler}
            name="category"
            radios={[
              { label: "Below 1 KANAL", value: "BELOW_1_KANAL" },
              { label: "1 KANAL & above", value: "1_KANAL_AND_ABOVE" },
            ]}
          />
        </div>
        <div className="w-full">
          {units?.length > 0 ? (
            <RACSelect
              idHtmlFor="unit"
              name="unit"
              label="Select unit"
              options={units?.map(unit => ({
                label: unit.name,
                value: unit.id,
              }))}
              value={currentPlot.unit}
              inputHandler={currentPlotInputHandler}
            />
          ) : (
            <div className="text-center text-balance">
              No units found. Please add one first.
            </div>
          )}
        </div>
      </AdminModal>
    </>
  );
};

export default PlotModal;
