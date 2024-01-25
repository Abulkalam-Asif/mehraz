import { InputBox, RolesAnalyticsCitiesModal, Dropzone } from "@/components";

const OfficeModal = ({
  newOfficeLocation,
  newOfficeLocationInputHandler,
  addNewOfficeLocationHandler,
  setNewOfficeLocation,
  showModalSpinner,
}) => {
  return (
    <>
      <RolesAnalyticsCitiesModal
        heading="add office"
        buttonText="add office"
        onButtonClick={addNewOfficeLocationHandler}
        className={"flex items-stretch gap-8"}
        showModalSpinner={showModalSpinner}>
        <div className="w-1/2 space-y-2">
          <InputBox
            label="Enter city name"
            value={newOfficeLocation.city}
            inputHandler={newOfficeLocationInputHandler}
            idHtmlFor="city"
            name="city"
          />
          <InputBox
            label="Enter office address"
            value={newOfficeLocation.address}
            inputHandler={newOfficeLocationInputHandler}
            idHtmlFor="address"
            name="address"
          />
          <InputBox
            label="Enter maps link"
            value={newOfficeLocation.mapsLink}
            inputHandler={newOfficeLocationInputHandler}
            idHtmlFor="mapsLink"
            name="mapsLink"
          />
        </div>
        <Dropzone
          message={"Attach an image (.jpg, .png, .gif etc)"}
          title={"Attach an image here"}
          accept="image/*"
          className={"w-1/2"}
          file={newOfficeLocation?.image}
          fileUploadHandler={(file) =>
            setNewOfficeLocation((prevState) => ({
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
