"use client";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

const ProductRatesInput = ({
  type = "text",
  value = "",
  inputHandler,
  min = 0,
  max = 0,
  maxLength = 0,
}) => {
  const { showAlert } = useContext(AlertContext);
  return (
    <>
      {type === "number" ? (
        <input
          type="number"
          value={value}
          className="w-full border-2 text-sm border-accent-1-base rounded-md px-2 py-0.5"
          step="any"
          min={min}
          max={max}
          onBlur={e => {
            if (e.target.value < min) {
              inputHandler(min);
              showAlert({
                type: "WARNING",
                message: `Minimum input value is ${min}`,
              });
            } else if (e.target.value > max) {
              inputHandler(max);
              showAlert({
                type: "WARNING",
                message: `Maximum input value is ${max}`,
              });
            } else {
              inputHandler(Number(e.target.value));
            }
          }}
          onChange={e => inputHandler(Number(e.target.value))}
        />
      ) : (
        type === "text" && (
          <input
            type={type}
            value={value}
            className="w-full border-2 text-sm border-accent-1-base rounded-md px-2 py-0.5"
            maxLength={maxLength}
            onChange={e => {
              inputHandler(e.target.value);
              if (e.target.value.length === maxLength) {
                showAlert({
                  type: "WARNING",
                  message: `Maximum input length is ${maxLength} characters`,
                });
              }
            }}
          />
        )
      )}
    </>
  );
};

export default ProductRatesInput;
