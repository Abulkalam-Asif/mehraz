"use client";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

const MaterialQtyInput = ({
  value,
  min = 0,
  max = 0,
  inputHandler,
  disabled = false,
}) => {
  const { showAlert } = useContext(AlertContext);
  return (
    <>
      <input
        value={value}
        disabled={disabled}
        type="number"
        onBlur={e => {
          if (e.target.value < min) {
            inputHandler(min);
            showAlert({ type: "WARNING", message: `Minimum value is ${min}` });
          } else if (e.target.value > max) {
            inputHandler(max);
            showAlert({ type: "WARNING", message: `Maximum value is ${max}` });
          } else {
            inputHandler(Number(e.target.value));
          }
        }}
        onChange={e => inputHandler(e.target.value)}
        className="w-full border-2 text-sm border-accent-1-base rounded-md px-2 py-0.5"
        min={min}
        max={max}
      />
    </>
  );
};

export default MaterialQtyInput;
