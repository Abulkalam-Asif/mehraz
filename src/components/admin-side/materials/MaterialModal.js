"use client";
import {
  AdminCheckbox,
  AdminInputBox,
  AdminModal,
  AdminMultiSelect2,
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
  cities,
}) => {
  const [previewSrc, setPreviewSrc] = useState({
    image1: null,
    image2: null,
  });

  useEffect(() => {
    if (currentMaterial?.image1) {
      if (currentMaterial?.image1 instanceof File) {
        const image1Url = URL.createObjectURL(currentMaterial.image1);
        setPreviewSrc(prevState => ({
          ...prevState,
          image1: image1Url,
        }));
        return () => URL.revokeObjectURL(image1Url);
      } else {
        setPreviewSrc(prevState => ({
          ...prevState,
          image1: currentMaterial.image1,
        }));
      }
    }
  }, [currentMaterial?.image1]);

  useEffect(() => {
    if (currentMaterial?.image2) {
      if (currentMaterial?.image2 instanceof File) {
        const image2Url = URL.createObjectURL(currentMaterial.image2);
        setPreviewSrc(prevState => ({
          ...prevState,
          image2: image2Url,
        }));
        return () => URL.revokeObjectURL(image2Url);
      } else {
        setPreviewSrc(prevState => ({
          ...prevState,
          image2: currentMaterial.image2,
        }));
      }
    }
  }, [currentMaterial?.image2]);

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
            required={true}
            maxLength={40}
          />
          <AdminInputBox
            label="Enter vendor name"
            value={currentMaterial.vendor}
            inputHandler={currentMaterialInputHandler}
            idHtmlFor="vendor"
            name="vendor"
            required={true}
            maxLength={40}
          />
          <AdminInputBox
            label="Enter rate"
            value={currentMaterial.rate}
            inputHandler={currentMaterialInputHandler}
            idHtmlFor="rate"
            name="rate"
            type="number"
            required={true}
            max={99999}
          />
          <AdminMultiSelect2
            title="Cities"
            message="Select cities"
            inputHandler={currentMaterialInputHandler}
            name="cities"
            options={cities.map(city => ({
              label: city.name,
              value: city.id,
            }))}
            selectedOptions={currentMaterial.cities}
          />
          <AdminInputBox
            label="Enter description"
            value={currentMaterial.description}
            inputHandler={currentMaterialInputHandler}
            idHtmlFor="description"
            name="description"
            type="textarea"
            required={true}
            maxLength={150}
          />
          <ListInput
            label="Enter specs"
            values={currentMaterial.specs}
            inputHandler={currentMaterialInputHandler}
            name="specs"
            required={true}
            maxLength={20}
          />
          <AdminSelect
            label="Select category"
            idHtmlFor="category"
            inputHandler={currentMaterialInputHandler}
            name="category"
            value={currentMaterial.category}
            required={true}
            options={materialCategories.map(category => ({
              label: category.name,
              value: category.id,
            }))}
          />
          <AdminInputBox
            label="Material ordered as"
            value={currentMaterial.orderedAs}
            inputHandler={currentMaterialInputHandler}
            idHtmlFor="orderedAs"
            name="orderedAs"
            required={true}
            maxLength={15}
          />
          <AdminCheckbox
            label="Is material fixed?"
            idHtmlFor="isFixed"
            name="isFixed"
            checked={currentMaterial.isFixed}
            inputHandler={currentMaterialInputHandler}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FileInput
            accept={"image/*"}
            htmlFor={"image1"}
            name="image1"
            inputHandler={currentMaterialInputHandler}
            message={"Attach image 1 (required)"}
            typeStartsWith={"image"}
            file={currentMaterial.image1}
            wrongFileTypeWarning="Please select an image file"
          />
          <div className="flex flex-col justify-center">
            {previewSrc?.image1 ? (
              <>
                <p className="text-accent-1-dark mb-1">Attached image 1</p>
                <Image
                  src={previewSrc.image1}
                  alt="attached image preview"
                  className="w-auto h-full max-h-32 object-contain"
                  width={500}
                  height={500}
                />
              </>
            ) : (
              <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl">
                <p>Image 1 will be displayed here</p>
              </div>
            )}
          </div>
          <FileInput
            accept={"image/*"}
            htmlFor={"image2"}
            name="image2"
            inputHandler={currentMaterialInputHandler}
            message={"Attach image 2 (required)"}
            typeStartsWith={"image"}
            file={currentMaterial.image2}
            wrongFileTypeWarning="Please select an image file"
          />
          <div className="flex flex-col justify-center">
            {previewSrc?.image2 ? (
              <>
                <p className="text-accent-1-dark mb-1">Attached image 2</p>
                <Image
                  src={previewSrc.image2}
                  alt="attached image preview"
                  className="w-auto h-full max-h-32 object-contain"
                  width={500}
                  height={500}
                />
              </>
            ) : (
              <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl">
                <p>Image 2 will be displayed here</p>
              </div>
            )}
          </div>
        </div>
      </AdminModal>
    </>
  );
};

export default MaterialModal;
