import { InputBox, RolesAnalyticsCitiesModal, Dropzone } from "@/components";

const OfficeModal = ({
  currentOfficeLocation,
  currentOfficeLocationInputHandler,
  addNewOfficeLocationHandler,
  setCurrentOfficeLocation,
  showModalSpinner,
  modalMetadata
}) => {
  return (
    <>
      <RolesAnalyticsCitiesModal
        heading={modalMetadata.action === "add" ? "Add office" : "Edit office"}
        buttonText={modalMetadata.action === "add" ? "Add office" : "Update office"}
        onButtonClick={addNewOfficeLocationHandler}
        className={"flex items-stretch gap-8"}
        showModalSpinner={showModalSpinner}>
        <div className="w-1/2 space-y-2">
          <InputBox
            label="Enter city name"
            value={currentOfficeLocation.city}
            inputHandler={currentOfficeLocationInputHandler}
            idHtmlFor="city"
            name="city"
          />
          <InputBox
            label="Enter office address"
            value={currentOfficeLocation.address}
            inputHandler={currentOfficeLocationInputHandler}
            idHtmlFor="address"
            name="address"
          />
          <InputBox
            label="Enter maps link"
            value={currentOfficeLocation?.mapsLink}
            inputHandler={currentOfficeLocationInputHandler}
            idHtmlFor="mapsLink"
            name="mapsLink"
          />
        </div>
        <Dropzone
          message={"Attach an image (.jpg, .png, .gif etc)"}
          title={"Attach an image here"}
          accept="image/*"
          className={"w-1/2"}
          file={currentOfficeLocation?.image}
          fileUploadHandler={(file) =>
            setCurrentOfficeLocation((prevState) => ({
              ...prevState,
              image: file,
            }))
          }
        />
      </RolesAnalyticsCitiesModal>
    </>
  );
};

export default OfficeModal;
