import {
  InputBox,
  MultiCheckbox,
  RolesAnalyticsCitiesModal,
} from "@/components";

const CurrencyModal = ({
  addNewCurrencyHandler,
  newCurrency,
  newCurrencyInputHandler,
  showModalSpinner,
  cities,
}) => {
  return (
    <>
      <RolesAnalyticsCitiesModal
        heading="add currency"
        buttonText="add currency"
        onButtonClick={addNewCurrencyHandler}
        className={"flex items-center gap-6 sm:gap-3"}
        showModalSpinner={showModalSpinner}>
        <div className="w-1/2 space-y-3">
          <InputBox
            label="Enter currency name"
            value={newCurrency.name}
            inputHandler={newCurrencyInputHandler}
            idHtmlFor="name"
            name="name"
          />
          <InputBox
            type="number"
            label="Enter value in PKR"
            value={newCurrency.inPkr}
            inputHandler={newCurrencyInputHandler}
            idHtmlFor="inPkr"
            name="inPkr"
          />
        </div>
        <div className="w-1/2 space-y-1">
          <span className="text-accent-1-dark">Select cities</span>
          <MultiCheckbox
            className={"max-h-24 pl-2 overflow-y-auto"}
            options={cities}
            name="cities"
            checked={newCurrency.cities}
            onChange={newCurrencyInputHandler}
          />
        </div>
      </RolesAnalyticsCitiesModal>
    </>
  );
};

export default CurrencyModal;
