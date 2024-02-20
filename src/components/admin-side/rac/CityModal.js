import { RACInputBox, RACModal } from "@/components";

const CityModal = ({
  addNewCityHandler,
  editCityHandler,
  currentCity,
  currentCityInputHandler,
  modalMetadata,
}) => {
  return (
    <>
      <RACModal
        heading={modalMetadata.action === "add" ? "Add city" : "Edit city"}
        buttonText={modalMetadata.action === "add" ? "Add city" : "Update city"}
        onButtonClick={
          modalMetadata.action === "add" ? addNewCityHandler : editCityHandler
        }>
        <RACInputBox
          label="Enter city name"
          value={currentCity.name}
          inputHandler={currentCityInputHandler}
          name="name"
          idHtmlFor="city"
        />
      </RACModal>
    </>
  );
};

export default CityModal;
