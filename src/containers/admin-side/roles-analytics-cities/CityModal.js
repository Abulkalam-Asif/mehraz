import { InputBox, RolesAnalyticsCitiesModal } from "@/components";

const CityModal = ({
  addNewCityHandler,
  editCityHandler,
  showModalSpinner,
  currentCity,
  currentCityInputHandler,
  modalMetadata,
}) => {
  return (
    <>
      <RolesAnalyticsCitiesModal
        heading={modalMetadata.action === "add" ? "Add city" : "Edit city"}
        buttonText={modalMetadata.action === "add" ? "Add city" : "Update city"}
        onButtonClick={
          modalMetadata.action === "add" ? addNewCityHandler : editCityHandler
        }
        showModalSpinner={showModalSpinner}>
        <InputBox
          label="Enter city name"
          value={currentCity.name}
          inputHandler={currentCityInputHandler}
          name="name"
          idHtmlFor="city"
        />
      </RolesAnalyticsCitiesModal>
    </>
  );
};

export default CityModal;
