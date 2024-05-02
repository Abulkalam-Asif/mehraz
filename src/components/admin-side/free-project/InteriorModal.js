"use client";
import { AdminInputBox, AdminModal, FileInput } from "@/components";
import { useEffect, useState } from "react";

const InteriorModal = ({
  currentInteriorView,
  currentInteriorViewInputHandler,
  addNewInteriorViewHandler,
  editInteriorViewHandler,
  modalMetadata,
}) => {
  const [previewSrc, setPreviewSrc] = useState(null);
  useEffect(() => {
    if (currentInteriorView?.video) {
      if (currentInteriorView.video instanceof File) {
        const videoUrl = URL.createObjectURL(currentInteriorView.video);
        setPreviewSrc(videoUrl);
        return () => URL.revokeObjectURL(videoUrl);
      } else {
        setPreviewSrc(currentInteriorView.video);
      }
    }
  }, [currentInteriorView?.video]);

  return (
    <>
      <AdminModal
        heading={
          modalMetadata.action === "ADD"
            ? "Add interior 360 view"
            : "Edit interior 360 view"
        }
        buttonText={modalMetadata.action === "ADD" ? "Add view" : "Update view"}
        onButtonClick={
          modalMetadata.action === "ADD"
            ? addNewInteriorViewHandler
            : editInteriorViewHandler
        }
        className={"flex items-center gap-8"}>
        <div className="w-1/2 space-y-2">
          <AdminInputBox
            label="Enter name"
            value={currentInteriorView.name}
            inputHandler={currentInteriorViewInputHandler}
            idHtmlFor="name"
            name="name"
          />
          <AdminInputBox
            label="Enter description"
            value={currentInteriorView.description}
            inputHandler={currentInteriorViewInputHandler}
            idHtmlFor="description"
            name="description"
          />
          <FileInput
            file={currentInteriorView.video}
            message={"Attach a video"}
            accept={"video/*"}
            typeStartsWith={"video"}
            inputHandler={currentInteriorViewInputHandler}
            name="video"
            htmlFor={"video"}
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

export default InteriorModal;
