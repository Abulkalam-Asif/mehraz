import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

const AdminInputBox2 = ({
  label = "",
  idHtmlFor = "",
  name = "",
  value = "",
  type = "text",
  inputHandler = () => {},
  className = "",
  required = false,
  min = 0,
  max = 100,
  maxLength = 100,
}) => {
  const { showAlert } = useContext(AlertContext);

  return (
    <>
      <div className={`flex flex-col space-y-1 ${className}`}>
        <div className="flex items-center gap-2 justify-between">
          <label
            htmlFor={idHtmlFor}
            className="text-lg font-medium uppercase text-accent-1-extra-dark lg:text-base">
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
            type={type}
            className="border-2 text-base border-accent-1-base rounded-md px-4 py-1"
            id={idHtmlFor}
            name={name}
            value={value}
            maxLength={maxLength}
            onChange={e => {
              inputHandler(e.target.name, e.target.value);
              if (e.target.value.length === maxLength) {
                showAlert({
                  type: "WARNING",
                  message: `Maximum input length is ${maxLength} characters`,
                });
              }
            }}
            autoComplete="off"
          />
        ) : type === "number" ? (
          <input
            type={type}
            className="border-2 text-base border-accent-1-base rounded-md px-4 py-1"
            id={idHtmlFor}
            name={name}
            value={value}
            min={min}
            max={max}
            onBlur={e => {
              if (e.target.value < min) {
                inputHandler(e.target.name, min);
                showAlert({
                  type: "WARNING",
                  message: `Minimum value for this field is ${min}`,
                });
              } else if (e.target.value > max) {
                inputHandler(e.target.name, max);
                showAlert({
                  type: "WARNING",
                  message: `Maximum value for this field is ${max}`,
                });
              } else {
                // Converting the value to a number
                inputHandler(e.target.name, Number(e.target.value));
              }
            }}
            onChange={e => {
              inputHandler(e.target.name, e.target.value);
            }}
            autoComplete="off"
          />
        ) : (
          type === "textarea" && (
            <textarea
              className="flex-1 border-2 text-base border-accent-1-base rounded-md px-4 py-1"
              id={idHtmlFor}
              name={name}
              value={value}
              maxLength={maxLength}
              onChange={e => {
                inputHandler(e.target.name, e.target.value);
                if (e.target.value.length === maxLength) {
                  showAlert({
                    type: "WARNING",
                    message: `Maximum input length is ${maxLength} characters`,
                  });
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

export default AdminInputBox2;
