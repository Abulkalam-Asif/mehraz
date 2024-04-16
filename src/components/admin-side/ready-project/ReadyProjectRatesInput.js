"use client";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

const ReadyProjectRatesInput = ({
  label,
  name,
  rates,
  inputHandler,
  required = false,
  className = "",
  maxLength,
}) => {
  const { showAlert } = useContext(AlertContext);

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <h3 className="text-lg font-medium uppercase text-accent-1-extra-dark lg:text-base">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </h3>
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1 w-1/3">
          <h4 className="w-full text-sm flex items-center gap-2 justify-between">
            <span>Primary</span>
            <span className={`text-xs font-bold text-accent-2-base`}>
              {maxLength - rates[0].length}
            </span>
          </h4>
          <input
            type="text"
            className="w-full border-2 text-base border-accent-1-base rounded-md px-4 py-1"
            value={rates[0]}
            maxLength={maxLength}
            onChange={e => {
              inputHandler(name, [e.target.value, rates[1], rates[2]]);
              if (e.target.value.length === maxLength) {
                showAlert({
                  type: "WARNING",
                  message: `Maximum input length is ${maxLength} characters`,
                });
              }
            }}
          />
        </div>
        <div className="flex flex-col items-center gap-1 w-2/3">
          <h4 className="w-full text-sm flex items-center gap-2 justify-between">
            <span className={`text-xs font-bold text-accent-2-base`}>
              {maxLength - rates[1].length}
            </span>
            <span>Secondary</span>
            <span className={`text-xs font-bold text-accent-2-base`}>
              {maxLength - rates[2].length}
            </span>
          </h4>
          <div className="flex gap-1">
            <input
              type="text"
              className="w-full border-2 text-base border-accent-1-base rounded-md px-4 py-1"
              value={rates[1]}
              maxLength={maxLength}
              onChange={e => {
                inputHandler(name, [rates[0], e.target.value, rates[2]]);
                if (e.target.value.length === maxLength) {
                  showAlert({
                    type: "WARNING",
                    message: `Maximum input length is ${maxLength} characters`,
                  });
                }
              }}
            />
            <input
              type="text"
              className="w-full border-2 text-base border-accent-1-base rounded-md px-4 py-1"
              value={rates[2]}
              maxLength={maxLength}
              onChange={e => {
                inputHandler(name, [rates[0], rates[1], e.target.value]);
                if (e.target.value.length === maxLength) {
                  showAlert({
                    type: "WARNING",
                    message: `Maximum input length is ${maxLength} characters`,
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyProjectRatesInput;
