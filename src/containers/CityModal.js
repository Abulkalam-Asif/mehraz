import { InputBox, RolesAnalyticsCitiesModal } from "@/components";

const CityModal = ({
  addNewCityHandler,
  showModalSpinner,
  currentCity,
  setCurrentCity,
  modalMetadata,
}) => {
  return (
    <>
      <RolesAnalyticsCitiesModal
        heading={modalMetadata.action === "add" ? "Add city" : "Edit city"}
        buttonText={modalMetadata.action === "add" ? "Add city" : "Update city"}
        onButtonClick={addNewCityHandler}
        showModalSpinner={showModalSpinner}>
        <InputBox
          label="Enter city name"
          value={currentCity}
          setInput={setCurrentCity}
          idHtmlFor="city"
        />
      </RolesAnalyticsCitiesModal>
    </>
  );
};

export default CityModal;
