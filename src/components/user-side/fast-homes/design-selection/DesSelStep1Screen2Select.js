"use client";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const DesSelStep1Screen2Select = ({
  options,
  selectedOption,
  selectHandler,
  className = "",
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
      <div className={`relative ${className}`}>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-stretch rounded-full overflow-hidden border border-[#282828] border-opacity-60">
          <span className="bg-white text-[#000000a6] py-2 sm:py-1 px-4 sm:px-3 text-xl xl:text-lg sm:text-base">
            {options.find(option => option.value === selectedOption)?.label}
          </span>
          <span className="bg-[#E2E2E2] flex items-center justify-center px-3 sm:px-2 border-l border-[#282828] border-opacity-60">
            <FaChevronDown
              size={28}
              className="w-5 sm:w-4 h-auto text-[#767676]"
            />
          </span>
        </button>
        {expanded && (
          <div
            className="w-max min-w-full absolute bottom-0 translate-y-full right-0 bg-white text-[#000000a6] shadow-2xl rounded-2xl border-2 border-accent-1-base px-1 py-2 grid grid-cols-1 z-10 max-h-[20vh] lg:min-h-[25vh] overflow-y-auto"
            ref={dropdownRef}>
            {options?.map(({ label, value }, index) => (
              <label
                className={`flex items-center gap-2 p-2 text-base xl:text-sm sm:text-xs cursor-pointer hover:bg-black hover:bg-opacity-5 ${
                  index !== options.length - 1
                    ? "border-b border-black border-opacity-10"
                    : ""
                }`}
                htmlFor={`option${index}`}
                key={index}>
                <input
                  id={`option${index}`}
                  type="checkbox"
                  value={value}
                  checked={selectedOption === value}
                  onChange={e => {
                    if (e.target.checked) {
                      selectHandler(value);
                    }
                    setExpanded(false);
                  }}
                  className="absolute top-0 left-0 text-accent-1-extra-dark rounded-md peer w-0 h-0 focus:outline-none"
                />
                <span className="block w-5 h-5 xl:w-4 xl:h-4 bg-white border-2 border-[#000000cc] rounded-full peer-checked:bg-[#000000cc]"></span>
                <span className="flex-1 px-1 peer-checked:font-medium peer-focus:outline-2 peer-focus:outline-dashed peer-focus:outline-accent-2-base ">
                  {label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DesSelStep1Screen2Select;
