"use client";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

const RACImageInput = ({
  message,
  className = "",
  imageStateSetter,
  accept,
  file,
}) => {
  const { showAlert } = useContext(AlertContext);

  const handleFileChange = event => {
    if (event.target.files && event.target.files[0]) {
      const newFile = event.target.files[0];
      if (newFile.type.startsWith("image/")) {
        imageStateSetter(newFile);
        showAlert({
          type: "SUCCESS",
          message: "Image attached successfully.",
        });
      } else {
        showAlert({
          type: "WARNING",
          message: "Please select an image to upload.",
        });
      }
    }
  };

  return (
    <>
      <div className="flex">
        <input
          id="dropzone-file"
          type="file"
          className="peer w-0 h-0 focus:outline-none"
          onChange={handleFileChange}
          accept={accept}
        />
        <label
          htmlFor="dropzone-file"
          className={`${className} block p-2 w-full border-2 border-accent-1-base rounded-md cursor-pointer bg-white text-center text-accent-1-dark hover:shadow-lg outline-2 peer-focus:outline-accent-2-base peer-focus:outline-dashed`}>
          {file ? (
            <span className="text-green-500">Image attached.</span>
          ) : (
            message
          )}
        </label>
      </div>
    </>
  );
};

export default RACImageInput;
