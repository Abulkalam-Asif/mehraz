"use client";
import { useState, useContext } from "react";
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
  const [isFocused, setIsFocused] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const initialFiles = Array.from(e.target.files);
      const filteredFiles = initialFiles.filter((file) => (file.type.startsWith(typeStartsWith)));
      if (initialFiles.length > filteredFiles.length) {
        showAlert({ type: "warning", message: wrongFileTypeWarning });
      }
      fileStateSetter(filteredFiles);
    }
  };

  const fileStateSetter = (newFiles) => {
    const resultantFiles = [...filesArray, ...newFiles];
    inputHandler(null, name, resultantFiles);
  };

  return (
    <>
      <label
        htmlFor={htmlFor}
        className={`${className} flex items-center justify-center p-2 w-full border-2 border-accent-1-base rounded-md cursor-pointer bg-white text-center text-accent-1-dark hover:shadow-lg ${isFocused ? "outline-2 outline-accent-1-dark outline-dashed" : ""
          }`}>
        {<span>{message}</span>}
        <input
          id={htmlFor}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="file"
          multiple={true}
          className="w-0 h-0 overflow-hidden focus:outline-none"
          onChange={handleFileChange}
          accept={accept}
        />
      </label>
    </>
  );
};

export default MultiFileInput;
