import { useContext } from "react";
import { AlertContext } from "@/context/AlertContext";

const FileInput = ({
  accept,
  file = null,
  message,
  name = "",
  htmlFor,
  className = "",
  typeStartsWith,
  wrongFileTypeWarning = "",
  inputHandler,
}) => {
  const { showAlert } = useContext(AlertContext);

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

  const imageStateSetter = currentfile => {
    inputHandler(null, name, currentfile);
  };

  return (
    <>
      <div className="flex">
        <input
          id={htmlFor}
          type="file"
          className="peer w-0 h-0 focus:outline-none"
          onChange={handleFileChange}
          accept={accept}
        />
        <label
          htmlFor={htmlFor}
          className={`${className} flex items-center justify-center p-2 w-full border-2 border-accent-1-base rounded-md cursor-pointer bg-white text-center text-accent-1-dark hover:shadow-lg outline-2 peer-focus:outline-accent-2-base peer-focus:outline-dashed`}>
          {file ? (
            <span className="text-green-500">File attached.</span>
          ) : (
            <span>{message}</span>
          )}
        </label>
      </div>
    </>
  );
};

export default FileInput;
