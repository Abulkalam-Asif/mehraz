"use client";
import {
  AdminCheckbox,
  AdminInputBox,
  AdminModal,
  FileInput,
} from "@/components";
import Image from "next/image";
import { useEffect, useState } from "react";

const MaterialCategoryModal = ({
  addNewMaterialCategoryHandler,
  editMaterialCategoryHandler,
  currentMaterialCategory,
  currentMaterialCategoryInputHandler,
  modalMetadata,
}) => {
  const [previewSrc, setPreviewSrc] = useState(null);

  useEffect(() => {
    if (currentMaterialCategory?.coverImage) {
      if (currentMaterialCategory?.coverImage instanceof File) {
        const coverImageUrl = URL.createObjectURL(
          currentMaterialCategory.coverImage,
        );
        setPreviewSrc(coverImageUrl);
        return () => URL.revokeObjectURL(coverImageUrl);
      } else {
        setPreviewSrc(currentMaterialCategory.coverImage);
      }
    }
  }, [currentMaterialCategory?.coverImage]);

  return (
    <>
      <AdminModal
        heading={
          modalMetadata.action === "ADD" ? "Add category" : "Edit category"
        }
        buttonText={
          modalMetadata.action === "ADD" ? "Add category" : "Update category"
        }
        onButtonClick={
          modalMetadata.action === "ADD"
            ? addNewMaterialCategoryHandler
            : editMaterialCategoryHandler
        }
        className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <AdminInputBox
            label="Enter category name"
            value={currentMaterialCategory.name}
            inputHandler={currentMaterialCategoryInputHandler}
            idHtmlFor="name"
            name="name"
            maxLength={20}
            required={true}
          />
          <AdminCheckbox
            label="Fix cover image?"
            idHtmlFor="fixCoverImage"
            name="fixCoverImage"
            checked={currentMaterialCategory.fixCoverImage}
            inputHandler={currentMaterialCategoryInputHandler}
          />
          <FileInput
            accept={"image/*"}
            htmlFor={"coverImage"}
            name="coverImage"
            inputHandler={currentMaterialCategoryInputHandler}
            message={`Attach cover image ${
              currentMaterialCategory.fixCoverImage
                ? "(required)"
                : "(optional)"
            }`}
            typeStartsWith={"image"}
            file={currentMaterialCategory.coverImage}
            wrongFileTypeWarning="Please select an image file"
          />
        </div>
        <div className="flex flex-col justify-center">
          {previewSrc ? (
            <>
              <p className="text-accent-1-dark mb-1">Attached image</p>
              <Image
                src={previewSrc}
                alt="attached image preview"
                className="w-auto h-full max-h-40 object-contain"
                width={500}
                height={500}
              />
            </>
          ) : (
            <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl">
              <p>Cover image will be displayed here</p>
            </div>
          )}
        </div>
      </AdminModal>
    </>
  );
};

export default MaterialCategoryModal;
