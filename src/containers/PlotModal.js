import { InputBox, RolesAnalyticsCitiesModal } from "@/components";

const PlotModal = ({
  newPlot,
  newPlotInputHandler,
  addNewPlotHandler,
  showModalSpinner,
}) => {
  return (
    <>
      <RolesAnalyticsCitiesModal
        heading="add plot"
        buttonText="add plot"
        onButtonClick={addNewPlotHandler}
        className={"flex items-center gap-8"}
        showModalSpinner={showModalSpinner}>
        <InputBox
          label="Enter area value"
          value={newPlot.area}
          inputHandler={newPlotInputHandler}
          idHtmlFor="area"
          name="area"
          type="number"
        />
        <InputBox
          label="Enter area unit"
          value={newPlot.unit}
          inputHandler={newPlotInputHandler}
          idHtmlFor="unit"
          name="unit"
        />
      </RolesAnalyticsCitiesModal>
    </>
  );
};

export default PlotModal;
