import {
  AdminInputBox,
  AdminModal,
  AdminRadio,
  AdminSelect,
} from "@/components";

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
        className={"grid grid-cols-2 gap-4"}>
        <AdminInputBox
          label="Enter area value"
          value={currentPlot.area}
          inputHandler={currentPlotInputHandler}
          idHtmlFor="area"
          name="area"
          type="number"
          required={true}
          max={9999999}
        />

        {units?.length > 0 ? (
          <AdminSelect
            idHtmlFor="unit"
            name="unit"
            label="Select unit"
            options={units?.map(unit => ({
              label: unit.name,
              value: unit.id,
            }))}
            value={currentPlot.unit}
            inputHandler={currentPlotInputHandler}
            required={true}
          />
        ) : (
          <div className="text-center text-balance">
            No units found. Please add one first.
          </div>
        )}
        <AdminRadio
          label="Select Category"
          adminRadioValue={currentPlot.category}
          inputHandler={currentPlotInputHandler}
          name="category"
          required={true}
          radios={[
            { label: "Below 1 KANAL", value: "UPTO_18" },
            { label: "1 KANAL & above", value: "1_KANAL_ABOVE" },
          ]}
        />
      </AdminModal>
    </>
  );
};

export default PlotModal;
