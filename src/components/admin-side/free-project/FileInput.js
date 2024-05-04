"use client";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";
import { Button, Modal } from "@/components";
import Image from "next/image";
import { useEffect, useState } from "react";

const FileInput = ({
  accept,
  file = null,
  message,
  name = "",
  idHtmlFor,
  className = "",
  typeStartsWith,
  wrongFileTypeWarning = "",
  inputHandler = () => {},
  classNameOuter = "",
  showPreview = false,
}) => {
  const { showAlert } = useContext(AlertContext);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showPreview) {
      if (file) {
        if (file instanceof File) {
          setPreviewSrc(URL.createObjectURL(file));
        } else {
          setPreviewSrc(file);
        }
      }
    }
  }, [file]);

  const handleFileChange = event => {
    if (event.target.files && event.target.files[0]) {
      const newFile = event.target.files[0];
      if (newFile.type.startsWith(typeStartsWith)) {
        imageStateSetter(newFile);
        showAlert({
          type: "SUCCESS",
          message: "File attached successfully.",
        });
      } else {
        showAlert({
          type: "WARNING",
          message: wrongFileTypeWarning,
        });
      }
    }
  };

  const imageStateSetter = currentFile => {
    inputHandler(name, currentFile);
  };

  return (
    <>
      <div className={`flex items-center ${classNameOuter}`}>
        <input
          id={idHtmlFor}
          type="file"
          className="peer w-0 h-0 focus:outline-none"
          onChange={handleFileChange}
          accept={accept}
        />
        <label
          htmlFor={idHtmlFor}
          className={`${className} flex items-center justify-center p-2 w-full border-2 border-accent-1-base rounded-md cursor-pointer bg-white text-center text-accent-1-dark hover:shadow-lg outline-2 peer-focus:outline-accent-2-base peer-focus:outline-dashed`}>
          {file ? (
            <span className="text-green-500">File attached.</span>
          ) : (
            <span>{message}</span>
          )}
        </label>
        {showPreview && previewSrc && (
          <Button
            className="ml-2"
            text="preview"
            size="sm"
            type="button"
            color="accent-2"
            onClick={() => {
              setShowModal(prevState => !prevState);
            }}
          />
        )}
      </div>
      {showModal && (
        <Modal
          isModalOpen={showModal}
          className="h-full max-h-[80vh] flex items-center justify-center"
          toggleModal={() => setShowModal(prevState => !prevState)}>
          {typeStartsWith === "image" ? (
            <Image
              className="w-full h-full object-contain"
              src={previewSrc}
              alt="file"
              width={500}
              height={500}
            />
          ) : (
            typeStartsWith === "video" && (
              <video
                src={previewSrc}
                controls={true}
                className="h-full w-auto"></video>
            )
          )}
        </Modal>
      )}
    </>
  );
};

export default FileInput;
