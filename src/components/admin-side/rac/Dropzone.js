"use client";
import { AlertContext } from "@/context/AlertContext";
import { useContext, useState, useEffect } from "react";

const Dropzone = ({
  message,
  title,
  className = "",
  fileUploadHandler,
  accept,
  previewSrc,
  setPreviewSrc,
}) => {
  const { showAlert } = useContext(AlertContext);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewSrc(reader.result);
        };

        reader.readAsDataURL(file);
        fileUploadHandler(file);
      } else {
        setFile(null);
        setPreviewSrc(null);
        fileUploadHandler(null);
        showAlert({
          type: "warning",
          message: "Please select an image to upload.",
        });
      }
    }
  }, [file]);

  return (
    <>
      <label
        title={title}
        htmlFor="dropzone-file"
        className={`${className} block p-2 w-full border-2 border-accent-1-base rounded-xl cursor-pointer bg-white text-center text-accent-1-dark hover:shadow-lg`}>
        {previewSrc ? (
          <span className="text-green-500">Image attached successfully</span>
        ) : (
          message
        )}
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
