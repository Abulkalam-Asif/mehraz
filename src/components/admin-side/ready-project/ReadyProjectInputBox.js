"use client";
import { useShowAlert } from "@/hooks/useShowAlert";

const ReadyProjectInputBox = ({
  value = "",
  areaId,
  budgetType = "",
  min = 0,
  max = 0,
  inputHandler,
}) => {
  const showAlert = useShowAlert();
  return (
    <>
      <input
        min={min}
        max={max}
        value={value}
        type="number"
        onChange={e => {
          if (e.target.value < min) {
            showAlert({
              type: "WARNING",
              message: `Minimum value of this field is ${min}`,
            });
            e.target.value = min;
          } else if (e.target.value > max) {
            showAlert({
              type: "WARNING",
              message: `Maximum value of this field is ${max}`,
            });
            e.target.value = max;
          }
          inputHandler(areaId, budgetType, e.target.value);
        }}
        className="w-full border-2 text-sm border-accent-1-base rounded-md px-4 py-1"
      />
    </>
  );
};

export default ReadyProjectInputBox;
