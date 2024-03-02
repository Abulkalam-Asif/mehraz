"use client";
import { useState, useEffect, useContext } from "react";
import { AlertContext } from "@/context/AlertContext";
import reduceFilename from "@/utilities/admin-panel/reduceFilename";

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
  const [files, setFiles] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const initialFiles = e.target.files;
      setFiles(initialFiles.filter);
    }
  };

  const fileStateSetter = (newFiles) => {
    const resultantFiles = [...filesArray, ...newFiles];
    inputHandler(null, name, resultantFiles);
  };

  useEffect(() => {
    if (files) {
      files.foreach((file) => {
        if (!file.type.startsWith(typeStartsWith)) {
          setFiles((prevState) =>
            prevState.filter((currFile) => currFile.name !== file.name)
          );
        }
      });

      fileStateSetter(files);
      // setFiles(null);
      // setFileName(null);
      // fileStateSetter(null);
      // showAlert({
      //   type: "warning",
      //   message: wrongFileTypeWarning,
      // });
    }
  }, [files]);

  return (
    <>
      <label
        htmlFor={htmlFor}
        className={`${className} flex items-center justify-center p-2 w-full border-2 border-accent-1-base rounded-md cursor-pointer bg-white text-center text-accent-1-dark hover:shadow-lg ${isFocused ? "outline-2 outline-accent-1-dark outline-dashed" : ""
          }`}>
        {<span>{message}</span>}
        <input
          id={htmlFor}
          onFocus={(e) => setIsFocused(true)}
          onBlur={(e) => setIsFocused(false)}
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
