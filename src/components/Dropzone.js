"use client"
import { AlertContext } from "@/app/context/AlertContext";
import React, { useContext, useState } from "react";

const Dropzone = ({
  message,
  title,
  className,
  fileUploadHandler,
  accept,
  file = null,
}) => {
  const { showAlert } = useContext(AlertContext);
  const [uploadedFileName, setUploadedFileName] = useState(file?.name || null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(file, file.name);
        setUploadedFileName(file.name);
        fileUploadHandler(file);
      } else {
        showAlert({
          type: "warning",
          message: "Please upload an image file",
        });
      }
    }
  };

  return (
    <>
      <label
        title={title}
        htmlFor="dropzone-file"
        className={`${className} flex flex-col items-center justify-center border-2 rounded-xl cursor-pointer bg-white shadow-3xl text-center`}>
        {(uploadedFileName && (
          <p className="text-sm text-green-500 text-wrap">
            <span className="font-medium">{uploadedFileName}</span> attached
          </p>
        )) ||
          message}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={accept}
        />
      </label>
    </>
  );
};

export default Dropzone;
