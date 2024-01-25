import { InputBox, RolesAnalyticsCitiesModal, Dropzone } from "@/components";

const StyleModal = ({
  addNewStyleHandler,
  newStyle,
  newStyleInputHandler,
  setNewStyle,
  showModalSpinner,
}) => {
  return (
    <>
      <RolesAnalyticsCitiesModal
        heading="add office"
        buttonText="add office"
        onButtonClick={addNewStyleHandler}
        className={"flex items-stretch gap-8"}
        showModalSpinner={showModalSpinner}>
        <div className="w-1/2 space-y-2">
          <InputBox
            label="Enter style name"
            value={newStyle.name}
            inputHandler={newStyleInputHandler}
            idHtmlFor="name"
            name="name"
          />
        </div>
        <Dropzone
          message={"Attach an image (.jpg, .png, .gif etc)"}
          title={"Attach an image here"}
          accept="image/*"
          className={"w-1/2"}
          file={newStyle?.image}
          fileUploadHandler={(file) =>
            setNewStyle((prevState) => ({
              ...prevState,
              image: file,
            }))
          }
        />
      </RolesAnalyticsCitiesModal>
    </>
  );
};

export default StyleModal;
