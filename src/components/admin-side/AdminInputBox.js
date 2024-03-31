import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

const AdminInputBox = ({
  label = "",
  idHtmlFor = "",
  name = "",
  value = "",
  type = "text",
  inputHandler = () => {},
  max = 0,
  min = 0,
  maxLength = 0,
  className = "",
  required = false,
}) => {
  const { showAlert } = useContext(AlertContext);

  return (
    <>
      <div className={`flex flex-col space-y-1 ${className}`}>
        <div className="flex items-center gap-2 justify-between">
          <label htmlFor={idHtmlFor} className="text-accent-1-dark">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
          {(type === "text" || type === "textarea") && (
            <span className={`text-xs font-bold text-accent-2-base`}>
              {maxLength - value.length}
            </span>
          )}
        </div>
        {type === "text" ? (
          <input
            type={"text"}
            className="border-2 text-sm border-accent-1-base rounded-md px-4 py-1"
            id={idHtmlFor}
            name={name}
            value={value}
            maxLength={maxLength}
            onChange={e => {
              if (e.target.value.length === maxLength) {
                showAlert({
                  type: "WARNING",
                  message: `Maximum input length is ${maxLength} characters`,
                });
              } else {
                inputHandler(e.target.name, e.target.value);
              }
            }}
            autoComplete="off"
          />
        ) : type === "number" ? (
          <input
            type={"number"}
            className="border-2 text-sm border-accent-1-base rounded-md px-4 py-1"
            id={idHtmlFor}
            name={name}
            value={value}
            max={max}
            min={min}
            onChange={e => {
              if (e.target.value > max) {
                e.target.value = max;
                showAlert({
                  type: "WARNING",
                  message: `Maximum value is ${max}`,
                });
              } else if (e.target.value < min) {
                e.target.value = min;
                showAlert({
                  type: "WARNING",
                  message: `Minimum value is ${min}`,
                });
              } else {
                inputHandler(e.target.name, e.target.value);
              }
            }}
            autoComplete="off"
          />
        ) : (
          type === "textarea" && (
            <textarea
              className="flex-1 border-2 text-sm border-accent-1-base rounded-md px-4 py-1"
              id={idHtmlFor}
              name={name}
              value={value}
              maxLength={maxLength}
              onChange={e => {
                if (e.target.value.length === maxLength) {
                  showAlert({
                    type: "WARNING",
                    message: `Maximum input length is ${maxLength} characters`,
                  });
                } else {
                  inputHandler(e.target.name, e.target.value);
                }
              }}
              autoComplete="off"
            />
          )
        )}
      </div>
    </>
  );
};

export default AdminInputBox;
