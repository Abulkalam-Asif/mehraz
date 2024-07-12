"use client";
import { AdminInputBox, AdminModal, RACImageInput } from "@/components";
import checkIfValidUrl from "@/utilities/admin-side/checkIfValidUrl";
import Image from "next/image";
import { useEffect, useState } from "react";

const OfficeModal = ({
  currentOfficeLocation,
  currentOfficeLocationInputHandler,
  addNewOfficeLocationHandler,
  editOfficeLocationHandler,
  setCurrentOfficeLocation,
  modalMetadata,
}) => {
  const [previewSrc, setPreviewSrc] = useState(null);
  useEffect(() => {
    if (
      currentOfficeLocation?.image &&
      currentOfficeLocation?.image instanceof File
    ) {
      const imageUrl = URL.createObjectURL(currentOfficeLocation.image);
      setPreviewSrc(imageUrl);
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [currentOfficeLocation?.image]);

  return (
    <>
      <AdminModal
        heading={modalMetadata.action === "ADD" ? "Add office" : "Edit office"}
        buttonText={
          modalMetadata.action === "ADD" ? "Add office" : "Update office"
        }
        onButtonClick={
          modalMetadata.action === "ADD"
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
            required={true}
            maxLength={20}
          />
          <AdminInputBox
            label="Enter office address"
            value={currentOfficeLocation.address}
            inputHandler={currentOfficeLocationInputHandler}
            idHtmlFor="address"
            name="address"
            required={true}
            maxLength={70}
          />
          <AdminInputBox
            label="Enter maps link"
            value={currentOfficeLocation?.mapsLink}
            inputHandler={currentOfficeLocationInputHandler}
            idHtmlFor="mapsLink"
            name="mapsLink"
            required={true}
            maxLength={150}
          />
          <RACImageInput
            message={"Attach an image. (required)"}
            accept="image/*"
            file={currentOfficeLocation?.image}
            imageStateSetter={file =>
              setCurrentOfficeLocation(prevState => ({
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
            <div className="w-full h-full p-4 flex items-center justify-center text-center text-accent-1-dark border-dashed border-2 border-accent-1-dark rounded-xl">
              <p>Attached image will be displayed here</p>
            </div>
          )}
        </div>
      </AdminModal>
    </>
  );
};

export default OfficeModal;
