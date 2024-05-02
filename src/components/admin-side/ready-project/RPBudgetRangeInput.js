"use client";
import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

const RPBudgetRangeInput = ({
  value = "",
  areaId,
  budgetType = "",
  min = 0,
  max = 0,
  inputHandler,
}) => {
  const { showAlert } = useContext(AlertContext);
  return (
    <>
      <input
        min={min}
        max={max}
        value={value}
        type="number"
        onBlur={e => {
          if (e.target.value < min) {
            inputHandler(areaId, budgetType, min);
            showAlert({
              type: "WARNING",
              message: `Minimum value of this field is ${min}`,
            });
          } else if (e.target.value > max) {
            inputHandler(areaId, budgetType, max);
            showAlert({
              type: "WARNING",
              message: `Maximum value of this field is ${max}`,
            });
          } else {
            // Converting the value to a number
            inputHandler(areaId, budgetType, Number(e.target.value));
          }
        }}
        onChange={e => {
          inputHandler(areaId, budgetType, e.target.value);
        }}
        className="w-full border-2 text-sm border-accent-1-base rounded-md px-4 py-1"
      />
    </>
  );
};

export default RPBudgetRangeInput;
