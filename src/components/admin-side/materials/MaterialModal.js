"use client";
import {
  AdminCheckbox,
  AdminInputBox,
  AdminModal,
  AdminSelect,
  FileInput,
  ListInput,
} from "@/components";
import Image from "next/image";
import { useEffect, useState } from "react";

const MaterialModal = ({
  addNewMaterialHandler,
  currentMaterial,
  materialCategories,
  currentMaterialInputHandler,
  editMaterialHandler,
  modalMetadata,
}) => {
  const [previewSrc, setPreviewSrc] = useState({
    image: null,
    cover: null,
  });

  useEffect(() => {
    if (currentMaterial?.image) {
      if (currentMaterial?.image instanceof File) {
        const imageUrl = URL.createObjectURL(currentMaterial.image);
        setPreviewSrc(prevState => ({
          ...prevState,
          image: imageUrl,
        }));
        return () => URL.revokeObjectURL(imageUrl);
      } else {
        setPreviewSrc(prevState => ({
          ...prevState,
          image: currentMaterial.image,
        }));
      }
    }
  }, [currentMaterial?.image]);

  useEffect(() => {
    if (currentMaterial?.cover) {
      if (currentMaterial?.cover instanceof File) {
        const coverUrl = URL.createObjectURL(currentMaterial.cover);
        setPreviewSrc(prevState => ({
          ...prevState,
          cover: coverUrl,
        }));
        return () => URL.revokeObjectURL(coverUrl);
      } else {
        setPreviewSrc(prevState => ({
          ...prevState,
          cover: currentMaterial.cover,
        }));
      }
    }
  }, [currentMaterial?.cover]);

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
        className="grid grid-cols-3 gap-4 sm:grid-cols-1">
        <div className="col-span-2 grid grid-cols-2 gap-4 sm:gap-2 sm:col-span-1">
          <AdminInputBox
            label="Enter material name"
            value={currentMaterial.name}
            inputHandler={currentMaterialInputHandler}
            idHtmlFor="name"
            name="name"
          />
          <AdminInputBox
            label="Enter vendor name"
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
          <AdminSelect
            label="Select category"
            idHtmlFor="category"
            inputHandler={currentMaterialInputHandler}
            name="category"
            value={currentMaterial.category}
            options={materialCategories.map(category => ({
              label: category.name,
              value: category.id,
            }))}
          />
          <AdminInputBox
            label="Enter description"
            value={currentMaterial.description}
            inputHandler={currentMaterialInputHandler}
            idHtmlFor="description"
            name="description"
            type="textarea"
          />
          <ListInput
            label="Enter specs"
            values={currentMaterial.specs}
            inputHandler={currentMaterialInputHandler}
            name="specs"
          />
          <AdminInputBox
            label="Material ordered as"
            value={currentMaterial.orderedAs}
            inputHandler={currentMaterialInputHandler}
            idHtmlFor="orderedAs"
            name="orderedAs"
          />
          <div>
            <AdminCheckbox
              label="Is material fixed?"
              idHtmlFor="isFixed"
              name="isFixed"
              checked={currentMaterial.isFixed}
              inputHandler={currentMaterialInputHandler}
            />
            <AdminCheckbox
              label="Display cover?"
              idHtmlFor="displayCover"
              name="displayCover"
              checked={currentMaterial.displayCover}
              inputHandler={currentMaterialInputHandler}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <FileInput
            accept={"image/*"}
            htmlFor={"image"}
            name="image"
            inputHandler={currentMaterialInputHandler}
            message={"Attach image"}
            typeStartsWith={"image"}
            file={currentMaterial.image}
            wrongFileTypeWarning="Please select an image file"
          />
          <div className="flex flex-col justify-center">
            {previewSrc?.image ? (
              <>
                <p className="text-accent-1-dark mb-1">Attached image</p>
                <Image
                  src={previewSrc.image}
                  alt="attached image preview"
                  className="w-auto h-full max-h-32 object-contain"
                  width={500}
                  height={500}
                />
              </>
            ) : (
              <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl">
                <p>Image will be displayed here</p>
              </div>
            )}
          </div>
          <FileInput
            accept={"image/*"}
            htmlFor={"cover"}
            name="cover"
            inputHandler={currentMaterialInputHandler}
            message={"Attach cover image"}
            typeStartsWith={"image"}
            file={currentMaterial.cover}
            wrongFileTypeWarning="Please select an image file"
          />
          <div className="flex flex-col justify-center">
            {previewSrc?.cover ? (
              <>
                <p className="text-accent-1-dark mb-1">Attached cover image</p>
                <Image
                  src={previewSrc.cover}
                  alt="attached image preview"
                  className="w-auto h-full max-h-32 object-contain"
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
        </div>
      </AdminModal>
    </>
  );
};

export default MaterialModal;
