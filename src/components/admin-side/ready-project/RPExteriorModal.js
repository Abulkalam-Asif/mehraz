"use client";
import {
  AdminInputBox,
  AdminModal,
  AdminSelect,
  FileInput,
} from "@/components";
import { useEffect, useState } from "react";

const RPExteriorModal = ({
  currentExteriorView,
  currentExteriorViewInputHandler,
  addNewExteriorViewHandler,
  editExteriorViewHandler,
  modalMetadata,
}) => {
  const [previewSrc, setPreviewSrc] = useState(null);
  useEffect(() => {
    if (currentExteriorView?.video) {
      if (currentExteriorView.video instanceof File) {
        const videoUrl = URL.createObjectURL(currentExteriorView.video);
        setPreviewSrc(videoUrl);
        return () => URL.revokeObjectURL(videoUrl);
      } else {
        setPreviewSrc(currentExteriorView.video);
      }
    }
  }, [currentExteriorView?.video]);

  return (
    <>
      <AdminModal
        heading={
          modalMetadata.action === "ADD"
            ? "Add exterior 360 view"
            : "Edit exterior 360 view"
        }
        buttonText={modalMetadata.action === "ADD" ? "Add view" : "Update view"}
        onButtonClick={
          modalMetadata.action === "ADD"
            ? addNewExteriorViewHandler
            : editExteriorViewHandler
        }
        className={"flex items-center gap-8"}>
        <div className="w-1/2 space-y-2">
          <AdminInputBox
            label="Enter name"
            value={currentExteriorView.name}
            inputHandler={currentExteriorViewInputHandler}
            idHtmlFor="exteriorViewName"
            name="name"
            maxLength={20}
            required={true}
          />
          <AdminInputBox
            label="Enter description"
            value={currentExteriorView.description}
            inputHandler={currentExteriorViewInputHandler}
            idHtmlFor="exteriorViewDescription"
            name="description"
            maxLength={50}
            required={true}
          />
          <AdminSelect
            idHtmlFor="exteriorViewOption"
            inputHandler={currentExteriorViewInputHandler}
            label="Select option(s)"
            name="option"
            options={[
              { label: "Option 1", value: "OPTION1" },
              { label: "Option 2", value: "OPTION2" },
              { label: "Both", value: "BOTH" },
            ]}
            value={currentExteriorView.option}
            required={true}
          />
          <FileInput
            file={currentExteriorView.video}
            message={"Attach a video (required)"}
            accept={"video/*"}
            typeStartsWith={"video"}
            inputHandler={currentExteriorViewInputHandler}
            name="video"
            idHtmlFor={"exteriorViewVideo"}
            wrongFileTypeWarning="Please attach a video"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center">
          {previewSrc ? (
            <>
              <p className="text-accent-1-dark mb-1">Attached video</p>
              <video src={previewSrc} controls={true}></video>
            </>
          ) : (
            <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl">
              <p>Attached video will be played here</p>
            </div>
          )}
        </div>
      </AdminModal>
    </>
  );
};

export default RPExteriorModal;
