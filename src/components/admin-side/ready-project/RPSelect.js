"use client";
import { useEffect, useState, useRef } from "react";
import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";

const RPSelect = ({
  title = "",
  name = "",
  selectedOption = "",
  options = [],
  designSelectHandler = () => {},
  required = false,
  uploadedDesigns = [],
}) => {
  const [expanded, setExpanded] = useState(false);

  const dropdownRef = useRef(null);

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [expanded]);

  return (
    <>
      <div className="flex flex-col space-y-1">
        <h3 className="text-lg font-medium uppercase text-accent-1-extra-dark lg:text-base">
          {title}
          {required && <span className="text-red-500"> *</span>}
        </h3>
        <div className="relative">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="w-full border-2 text-base border-accent-1-base rounded-md px-4 py-1 flex flex-col items-center">
            {options.find(option => option.value === selectedOption)?.label}
          </button>
          {expanded && (
            <div
              className="w-max absolute bottom-0 translate-y-full right-0 bg-white shadow-2xl rounded-md border-2 border-accent-1-base p-4 grid grid-cols-1 z-10 max-h-[33vh] overflow-y-auto"
              ref={dropdownRef}>
              {options?.map(({ label, value }, index) => (
                <div
                  key={index}
                  className="border-b border-b-accent-2-base relative">
                  <input
                    id={`option${index}`}
                    type="checkbox"
                    value={value}
                    checked={selectedOption === value}
                    onChange={e => {
                      if (e.target.checked) {
                        designSelectHandler(value);
                      }
                      setExpanded(false);
                    }}
                    className="absolute top-0 left-0 text-accent-1-extra-dark rounded-md peer w-0 h-0 focus:outline-none"
                  />
                  <label
                    className="flex items-center gap-2 text-sm cursor-pointer peer-checked:font-bold peer-focus:outline-2 peer-focus:outline-dashed peer-focus:outline-accent-2-base p-2 hover:bg-accent-1-base"
                    htmlFor={`option${index}`}
                    key={index}>
                    <div>
                      {uploadedDesigns.includes(value) ? (
                        <FaCheckCircle size={14} className="text-green-500" />
                      ) : (
                        <FaMinusCircle size={14} />
                      )}
                    </div>
                    <div className="flex flex-col items-start">{label}</div>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RPSelect;
