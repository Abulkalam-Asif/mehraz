"use client";
import { AdminInputBox, AdminModal, FileInput } from "@/components";
import Image from "next/image";
import { useEffect, useState } from "react";

const MaterialsModal = ({
  currentMaterial,
  currentMaterialInputHandler,
  addNewMaterialHandler,
  editMaterialHandler,
  modalMetadata,
}) => {
  const [previewSrc, setPreviewSrc] = useState(null);
  useEffect(() => {
    if (currentMaterial?.image) {
      if (currentMaterial.image instanceof File) {
        const imageUrl = URL.createObjectURL(currentMaterial.image);
        setPreviewSrc(imageUrl);
        return () => URL.revokeObjectURL(imageUrl);
      } else {
        setPreviewSrc(currentMaterial.image);
      }
    }
  }, [currentMaterial?.image]);

  return (
    <>
      <AdminModal
        heading={
          modalMetadata.action === "ADD" ? "Add material" : "Edit material"
        }
        buttonText={
          modalMetadata.action === "ADD" ? "Add material" : "Update material"
        }
        onButtonClick={
          modalMetadata.action === "ADD"
            ? addNewMaterialHandler
            : editMaterialHandler
        }
        className={"flex items-center gap-8"}>
        <div className="w-1/2 space-y-2">
          <AdminInputBox
            label="Enter name"
            value={currentMaterial.name}
            inputHandler={currentMaterialInputHandler}
            idHtmlFor="name"
            name="name"
          />
          <AdminInputBox
            label="Enter vendor"
            value={currentMaterial.vendor}
            inputHandler={currentMaterialInputHandler}
            idHtmlFor="vendor"
            name="vendor"
          />
          <AdminInputBox
            label="Enter rate"
            value={currentMaterial.rate}
            inputHandler={currentMaterialInputHandler}
            idHtmlFor="rate"
            name="rate"
            type="number"
            max={99999}
          />
          <FileInput
            file={currentMaterial.image}
            message={"Attach an image"}
            accept={"image/*"}
            typeStartsWith={"image"}
            inputHandler={currentMaterialInputHandler}
            name="image"
            htmlFor={"image"}
            wrongFileTypeWarning="Please attach an image"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center">
          {previewSrc ? (
            <>
              <p className="text-accent-1-dark mb-1">Attached image</p>
              <Image
                src={previewSrc}
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

export default MaterialsModal;
