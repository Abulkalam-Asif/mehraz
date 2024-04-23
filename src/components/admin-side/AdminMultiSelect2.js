"use client";
import { useEffect, useState, useRef } from "react";

const AdminMultiSelect = ({
  title = "",
  name = "",
  message = "",
  options = [],
  selectedOptions = [],
  inputHandler = () => {},
  required = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  const dropdownRef = useRef(null);

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    const listener = handleClickOutside;
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [expanded]);

  return (
    <>
      <div className="flex flex-col space-y-1">
        <h3>
          {title}
          {required && <span className="text-red-500"> *</span>}
        </h3>
        <div className="relative">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className={`text-sm w-full border-2 border-accent-1-base rounded-md px-4 py-1 ${
              selectedOptions.length > 0 ? "font-bold" : ""
            }`}>
            {message}
          </button>
          {expanded && (
            <div
              className="w-max absolute bottom-0 translate-y-full right-0 bg-white shadow-2xl rounded-md border-2 border-accent-1-base px-4 py-2 grid grid-cols-2 gap-x-3 gap-y-2 z-10 sm:grid-cols-1"
              ref={dropdownRef}>
              {options.map(({ label, value }, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    id={`option${index}`}
                    type="checkbox"
                    value={value}
                    checked={selectedOptions.some(o => o === value)}
                    onChange={e => {
                      if (e.target.checked) {
                        inputHandler(name, [...selectedOptions, value]);
                      } else {
                        inputHandler(
                          name,
                          selectedOptions.filter(o => o !== value),
                        );
                      }
                    }}
                    className="text-accent-1-extra-dark rounded-md"
                  />
                  <label
                    htmlFor={`option${index}`}
                    key={index}
                    className="text-sm">
                    {label}
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

export default AdminMultiSelect;
