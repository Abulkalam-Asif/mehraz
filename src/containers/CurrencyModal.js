import {
  InputBox,
  MultiCheckbox,
  RolesAnalyticsCitiesModal,
} from "@/components";

const CurrencyModal = ({
  addNewCurrencyHandler,
  currentCurrency,
  currentCurrencyInputHandler,
  showModalSpinner,
  cities,
  modalMetadata,
}) => {
  return (
    <>
      <RolesAnalyticsCitiesModal
        heading={
          modalMetadata.action === "add" ? "Add currency" : "Edit currency"
        }
        buttonText={
          modalMetadata.action === "add" ? "Add currency" : "Update currency"
        }
        onButtonClick={addNewCurrencyHandler}
        className={"flex items-center gap-6 sm:gap-3"}
        showModalSpinner={showModalSpinner}>
        <div className="w-1/2 space-y-3">
          <InputBox
            label="Enter currency name"
            value={currentCurrency.name}
            inputHandler={currentCurrencyInputHandler}
            idHtmlFor="name"
            name="name"
          />
          <InputBox
            type="number"
            label="Enter value in PKR"
            value={currentCurrency.inPkr}
            inputHandler={currentCurrencyInputHandler}
            idHtmlFor="inPkr"
            name="inPkr"
          />
        </div>
        <div className="w-1/2 space-y-1">
          <span className="text-accent-1-dark">Select cities</span>
          <MultiCheckbox
            className={"max-h-24 pl-2 overflow-y-auto"}
            options={cities}
            inputName="cities"
            checked={currentCurrency.cities}
            onChange={currentCurrencyInputHandler}
          />
        </div>
      </RolesAnalyticsCitiesModal>
    </>
  );
};

export default CurrencyModal;
