import { InputBox, RolesAnalyticsCitiesModal, Dropzone } from "@/components";

const StyleModal = ({
  addNewStyleHandler,
  currentStyle,
  currentStyleInputHandler,
  setCurrentStyle,
  showModalSpinner,
  modalMetadata,
}) => {
  return (
    <>
      <RolesAnalyticsCitiesModal
        heading={modalMetadata.action === "add" ? "Add style" : "Edit style"}
        buttonText={
          modalMetadata.action === "add" ? "Add style" : "Update style"
        }
        onButtonClick={addNewStyleHandler}
        className={"flex items-stretch gap-8"}
        showModalSpinner={showModalSpinner}>
        <div className="w-1/2 space-y-2">
          <InputBox
            label="Enter style name"
            value={currentStyle.name}
            inputHandler={currentStyleInputHandler}
            idHtmlFor="name"
            name="name"
          />
        </div>
        <Dropzone
          message={"Attach an image (.jpg, .png, .gif etc)"}
          title={"Attach an image here"}
          accept="image/*"
          className={"w-1/2"}
          file={currentStyle?.image}
          fileUploadHandler={(file) =>
            setCurrentStyle((prevState) => ({
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
