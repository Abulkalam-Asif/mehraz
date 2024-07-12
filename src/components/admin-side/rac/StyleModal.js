"use client";
import {
  AdminInputBox,
  AdminModal,
  RACImageInput,
  AdminSelect,
} from "@/components";
import checkIfValidUrl from "@/utilities/admin-side/checkIfValidUrl";
import Image from "next/image";
import { useEffect, useState } from "react";

const StyleModal = ({
  addNewStyleHandler,
  editStyleHandler,
  currentStyle,
  currentStyleInputHandler,
  setCurrentStyle,
  modalMetadata,
}) => {
  const [previewSrc, setPreviewSrc] = useState(null);
  useEffect(() => {
    if (currentStyle?.image && currentStyle?.image instanceof File) {
      const imageUrl = URL.createObjectURL(currentStyle.image);
      setPreviewSrc(imageUrl);
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [currentStyle?.image]);

  return (
    <>
      <AdminModal
        heading={modalMetadata.action === "ADD" ? "Add style" : "Edit style"}
        buttonText={
          modalMetadata.action === "ADD" ? "Add style" : "Update style"
        }
        onButtonClick={
          modalMetadata.action === "ADD" ? addNewStyleHandler : editStyleHandler
        }
        className={"flex items-stretch gap-8"}>
        <div className="w-1/2 space-y-2">
          <AdminInputBox
            label="Enter style name"
            value={currentStyle.name}
            inputHandler={currentStyleInputHandler}
            idHtmlFor="name"
            name="name"
            maxLength={20}
          />
          <AdminSelect
            label="Select budget"
            value={currentStyle.budget}
            name="budget"
            idHtmlFor="budget"
            inputHandler={currentStyleInputHandler}
            options={[
              { label: "Low", value: "LOW" },
              { label: "Medium", value: "MEDIUM" },
              { label: "High", value: "HIGH" },
            ]}
          />
          <RACImageInput
            message={"Attach an image."}
            accept="image/*"
            file={currentStyle?.image}
            imageStateSetter={file =>
              setCurrentStyle(prevState => ({
                ...prevState,
                image: file,
              }))
            }
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center">
          {previewSrc || checkIfValidUrl(currentStyle.image) ? (
            <>
              <p className="text-accent-1-dark mb-1">Attached image</p>
              <Image
                src={previewSrc || currentStyle.image}
                alt="attached image preview"
                className="h-full w-auto object-contain"
                width={500}
                height={500}
              />
            </>
          ) : (
            <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl">
              <p>Attached image will be displayed here</p>
            </div>
          )}
        </div>
      </AdminModal>
    </>
  );
};

export default StyleModal;
