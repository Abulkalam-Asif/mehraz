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
        heading={modalMetadata.action === "add" ? "Add city" : "Edit city"}
        buttonText={modalMetadata.action === "add" ? "Add city" : "Update city"}
        onButtonClick={
          modalMetadata.action === "add" ? addNewCityHandler : editCityHandler
        }>
        <AdminInputBox
          label="Enter city name"
          value={currentCity.name}
          inputHandler={currentCityInputHandler}
          name="name"
          idHtmlFor="city"
        />
      </AdminModal>
    </>
  );
};

export default CityModal;
