"use client";
import { AdminInputBox, AdminModal, RACImageInput } from "@/components";
import checkIfValidUrl from "@/utilities/admin-panel/roles-analytics-cities/checkIfValidUrl";
import Image from "next/image";
import { useState } from "react";

const OfficeModal = ({
  currentOfficeLocation,
  currentOfficeLocationInputHandler,
  addNewOfficeLocationHandler,
  editOfficeLocationHandler,
  setCurrentOfficeLocation,
  modalMetadata,
}) => {
  const [previewSrc, setPreviewSrc] = useState(null);

  return (
    <>
      <AdminModal
        heading={modalMetadata.action === "add" ? "Add office" : "Edit office"}
        buttonText={
          modalMetadata.action === "add" ? "Add office" : "Update office"
        }
        onButtonClick={
          modalMetadata.action === "add"
            ? addNewOfficeLocationHandler
            : editOfficeLocationHandler
        }
        className={"flex items-stretch gap-8"}>
        <div className="w-1/2 space-y-2">
          <AdminInputBox
            label="Enter office name"
            value={currentOfficeLocation.name}
            inputHandler={currentOfficeLocationInputHandler}
            idHtmlFor="name"
            name="name"
          />
          <AdminInputBox
            label="Enter office address"
            value={currentOfficeLocation.address}
            inputHandler={currentOfficeLocationInputHandler}
            idHtmlFor="address"
            name="address"
          />
          <AdminInputBox
            label="Enter maps link"
            value={currentOfficeLocation?.mapsLink}
            inputHandler={currentOfficeLocationInputHandler}
            idHtmlFor="mapsLink"
            name="mapsLink"
          />
          <RACImageInput
            message={"Attach an image (.jpg, .png, .gif etc)"}
            title={"Attach an image here"}
            accept="image/*"
            setPreviewSrc={setPreviewSrc}
            previewSrc={previewSrc}
            file={currentOfficeLocation?.image}
            imageStateSetter={(file) =>
              setCurrentOfficeLocation((prevState) => ({
                ...prevState,
                image: file,
              }))
            }
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center">
          {previewSrc || checkIfValidUrl(currentOfficeLocation.image) ? (
            <>
              <p className="text-accent-1-dark mb-1">Attached image</p>
              <Image
                src={previewSrc || currentOfficeLocation.image}
                alt="attached image preview"
                className="h-full w-auto object-contain"
                width={500}
                height={500}
              />
            </>
          ) : (
            <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-2 border-accent-1-base rounded-xl">
              <p>Attached image will be displayed here</p>
            </div>
          )}
        </div>
      </AdminModal>
    </>
  );
};

export default OfficeModal;
