import { fileSizeConversion } from "@/utilities/admin-side/fileSizeConversion";
import reduceFilename from "@/utilities/admin-side/reduceFilename";
import { FaXmark } from "react-icons/fa6";

const MultiFileDisplay = ({
  filesArray,
  removeFileHandler,
  className = "",
  name,
}) => {
  const removeHandler = index => {
    const newFilesArray = filesArray.filter((_, i) => i !== index);
    removeFileHandler(name, newFilesArray);
  };

  return (
    <>
      <div className={`flex flex-col gap-y-2 text-white ${className}`}>
        {filesArray.map((file, index) => (
          <div
            key={index}
            className="flex items-center gap-4 justify-between rounded w-full bg-accent-1-dark px-2 py-1">
            <span>{reduceFilename(file.name, 15)}</span>
            <span className="text-sm">{fileSizeConversion(file.size)}</span>
            <button
              title="Remove file"
              type="button"
              onClick={() => removeHandler(index)}
              className="hover:bg-accent-1-extra-dark rounded-sm p-0.5">
              <FaXmark className="text-white" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default MultiFileDisplay;
