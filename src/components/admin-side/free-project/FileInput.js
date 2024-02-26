"use client";
import { useState, useEffect, useContext } from "react";
import { AlertContext } from "@/context/AlertContext";
import reduceFilename from "@/utilities/admin-panel/reduceFilename";

const FileInput = ({
  accept,
  message,
  name = "",
  htmlFor,
  className = "",
  typeStartsWith,
  wrongFileTypeWarning = "",
  inputHandler,
}) => {
  const { showAlert } = useContext(AlertContext);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const fileStateSetter = (currentfile) => {
    inputHandler(null, name, currentfile);
  };

  useEffect(() => {
    if (file) {
      if (file.type.startsWith(typeStartsWith)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFileName(reduceFilename(file.name, 13));
        };
        reader.readAsDataURL(file);
        fileStateSetter(file);
      } else {
        setFile(null);
        setFileName(null);
        fileStateSetter(null);
        showAlert({
          type: "warning",
          message: wrongFileTypeWarning,
        });
      }
    }
  }, [file]);

  return (
    <>
      <label
        htmlFor={htmlFor}
        className={`${className} flex items-center justify-center p-2 w-full border-2 border-accent-1-base rounded-md cursor-pointer bg-white text-center text-accent-1-dark hover:shadow-lg ${
          isFocused ? "outline-2 outline-accent-1-dark outline-dashed" : ""
        }`}>
        {fileName ? (
          <span className="text-green-500">
            {fileName} attached successfully.
          </span>
        ) : (
          <span>{message}</span>
        )}
        <input
          id={htmlFor}
          onFocus={(e) => setIsFocused(true)}
          onBlur={(e) => setIsFocused(false)}
          type="file"
          className="w-0 h-0 overflow-hidden focus:outline-none"
          onChange={handleFileChange}
          accept={accept}
        />
      </label>
    </>
  );
};

export default FileInput;
