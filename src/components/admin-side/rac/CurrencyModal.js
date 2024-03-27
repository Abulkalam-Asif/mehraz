import { AdminInputBox, MultiCheckbox, AdminModal } from "@/components";

const CurrencyModal = ({
  addNewCurrencyHandler,
  editCurrencyHandler,
  currentCurrency,
  currentCurrencyInputHandler,
  cities,
  modalMetadata,
}) => {
  return (
    <>
      <AdminModal
        heading={
          modalMetadata.action === "ADD" ? "Add currency" : "Edit currency"
        }
        buttonText={
          modalMetadata.action === "ADD" ? "Add currency" : "Update currency"
        }
        onButtonClick={
          modalMetadata.action === "ADD"
            ? addNewCurrencyHandler
            : editCurrencyHandler
        }
        className={"flex items-center gap-6 sm:gap-3"}>
        <div className="w-1/2 space-y-3">
          <AdminInputBox
            label="Enter currency name"
            value={currentCurrency.name}
            inputHandler={currentCurrencyInputHandler}
            idHtmlFor="name"
            name="name"
            required={true}
            maxLength={20}
          />
          <AdminInputBox
            type="number"
            label="Enter value in PKR"
            value={currentCurrency.valueInPkr}
            inputHandler={currentCurrencyInputHandler}
            idHtmlFor="valueInPkr"
            name="valueInPkr"
            required={true}
            max={9999}
          />
        </div>
        <MultiCheckbox
          outerClassName={"w-1/2 space-y-1"}
          className={"max-h-24 pl-2 overflow-y-auto"}
          options={cities}
          inputName="cities"
          checkedBoxes={currentCurrency?.cities}
          onChange={currentCurrencyInputHandler}
          title="Select cities"
          required={true}
        />
      </AdminModal>
    </>
  );
};

export default CurrencyModal;
