"use client";
import { useContext } from "react";
import { AlertContext } from "@/context/AlertContext";

const MultiFileInput = ({
  accept,
  filesArray = [],
  message,
  name = "",
  htmlFor,
  className = "",
  typeStartsWith,
  wrongFileTypeWarning = "",
  inputHandler,
}) => {
  const { showAlert } = useContext(AlertContext);

  const handleFileChange = e => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const filteredFiles = newFiles.filter(file =>
        file.type.startsWith(typeStartsWith),
      );
      if (newFiles.length > filteredFiles.length) {
        showAlert({ type: "WARNING", message: wrongFileTypeWarning });
      }
      imageStateSetter(filteredFiles);
      showAlert({
        type: "SUCCESS",
        message: "File(s) attached successfully.",
      });
    }
  };

  const imageStateSetter = newFiles => {
    const resultantFiles = [...filesArray, ...newFiles];
    inputHandler(null, name, resultantFiles);
  };

  return (
    <>
      <div className="flex">
        <input
          id={htmlFor}
          type="file"
          multiple={true}
          className="peer w-0 h-0 focus:outline-none"
          onChange={handleFileChange}
          accept={accept}
        />
        <label
          htmlFor={htmlFor}
          className={`${className} flex items-center justify-center p-2 w-full border-2 border-accent-1-base rounded-md cursor-pointer bg-white text-center text-accent-1-dark hover:shadow-lg outline-2 peer-focus:outline-accent-2-base peer-focus:outline-dashed`}>
          {<span>{message}</span>}
        </label>
      </div>
    </>
  );
};

export default MultiFileInput;
