"use client";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

const ListInput = ({
  label = "",
  name = "",
  values = [],
  inputHandler = () => {},
  className = "",
  maxLength = 0,
  required = false,
}) => {
  const { showAlert } = useContext(AlertContext);
  return (
    <>
      <div className={`flex flex-col space-y-1 overflow-y-auto ${className}`}>
        <div className="flex items-center gap-2 justify-between">
          <span className="text-accent-1-dark">
            {label} {required && <span className="text-red-500"> *</span>}
          </span>
          <span className={`text-xs font-bold text-accent-2-base`}>
            {maxLength}
          </span>
        </div>
        <div className="space-y-2">
          {values?.map((spec, index) => (
            <div key={index} className="flex space-x-2 items-center">
              <span>{index + 1}.</span>
              <input
                type="text"
                maxLength={maxLength}
                onChange={e => {
                  const newSpecs = [...values];
                  newSpecs[index] = e.target.value;
                  inputHandler(name, newSpecs);
                  if (e.target.value.length === maxLength) {
                    showAlert({
                      type: "WARNING",
                      message: `Maximum input length is ${maxLength} characters`,
                    });
                  }
                }}
                value={spec}
                className="w-full border-2 text-sm border-accent-1-base rounded-md px-4 py-1"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListInput;
