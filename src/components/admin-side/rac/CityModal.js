import { AdminInputBox, AdminModal } from "@/components";

const CityModal = ({
  addNewCityHandler,
  editCityHandler,
  currentCity,
  currentCityInputHandler,
  modalMetadata,
}) => {
  return (
    <>
      <AdminModal
        heading={modalMetadata.action === "ADD" ? "Add city" : "Edit city"}
        buttonText={modalMetadata.action === "ADD" ? "Add city" : "Update city"}
        onButtonClick={
          modalMetadata.action === "ADD" ? addNewCityHandler : editCityHandler
        }>
        <AdminInputBox
          label="Enter city name"
          value={currentCity.name}
          inputHandler={currentCityInputHandler}
          name="name"
          idHtmlFor="city"
          required={true}
          maxLength={20}
        />
      </AdminModal>
    </>
  );
};

export default CityModal;
