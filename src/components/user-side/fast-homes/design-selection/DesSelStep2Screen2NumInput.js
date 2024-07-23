"use client";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const DesSelStep2Screen2NumInput = ({
  currencies,
  selectedCurrency,
  selectHandler,
  budget,
  setBudget,
  min,
  max,
  inputStep
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
      <div
        className={`w-max mx-auto flex items-center rounded-full border border-[#282828]/60`}>
        <input
          type="number"
          value={budget}
          step={inputStep}
          min={min}
          max={max}
          onChange={e => setBudget(e.target.value)}
          className="rounded-l-full px-4 py-2 text-1.5xl text-[2F2F2F]"
          placeholder="Enter..."
          onBlur={e => {
            if (e.target.value < min) setBudget(min);
            if (e.target.value > max) setBudget(max);
          }}
        />
        <div className="relative">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="rounded-r-full bg-[#E2E2E2] flex items-center justify-center gap-2 px-4 border-l border-l-[#282828]/60">
            <span className="text-[#2F2F2F] py-2 text-1.5xl">
              {
                currencies.find(option => option.value === selectedCurrency)
                  ?.label
              }
            </span>
            <FaChevronDown size={28} className="w-5 h-auto text-[#2F2F2F]" />
          </button>
          {expanded && (
            <div className="w-max min-w-full absolute bottom-0 translate-y-full right-0 bg-white shadow-btn rounded-2xl border-2 border-accent-1-base py-2 pl-2 pr-1 z-[10] overflow-hidden">
              <div
                className="w-full text-black/70 grid grid-cols-1 gap-2.5 max-h-[33vh] overflow-y-auto pr-1 py-2"
                ref={dropdownRef}>
                {currencies?.map(({ label, value }, index) => (
                  <label
                    className={`flex items-center gap-3 p-2 text-xl xl:text-base sm:text-sm cursor-pointer hover:bg-black hover:bg-opacity-5 ${
                      index !== currencies.length - 1
                        ? "border-b border-black border-opacity-10"
                        : ""
                    }`}
                    htmlFor={`option${index}`}
                    key={index}>
                    <input
                      id={`option${index}`}
                      type="checkbox"
                      value={value}
                      checked={selectedCurrency === value}
                      onChange={e => {
                        if (e.target.checked) {
                          selectHandler(value);
                        }
                        setExpanded(false);
                      }}
                      className="absolute top-0 left-0 text-accent-1-extra-dark rounded-md peer w-0 h-0 focus:outline-none"
                    />
                    <span className="block w-6 h-6 xl:w-5 xl:h-5 bg-white border-2 border-[#000000cc] rounded-full peer-checked:bg-[#000000cc]"></span>
                    <span className="flex-1 px-1 peer-checked:font-medium peer-focus:outline-2 peer-focus:outline-dashed peer-focus:outline-accent-2-base ">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DesSelStep2Screen2NumInput;
