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
  className = "",
}) => {
  const { showAlert } = useContext(AlertContext);

  return (
    <>
      <div className={`flex flex-col space-y-1 ${className}`}>
        <label htmlFor={idHtmlFor} className="text-accent-1-dark">
          {label}
        </label>
        {type === "text" ? (
          <input
            type={"text"}
            className="border-2 text-sm border-accent-1-base rounded-md px-4 py-1"
            id={idHtmlFor}
            name={name}
            value={value}
            onChange={e => {
              inputHandler(e.target.name, e.target.value);
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
            onChange={e => {
              if (e.target.value > max) {
                e.target.value = max;
                showAlert({
                  type: "WARNING",
                  message: `Maximum value is ${max}`,
                });
              }
              inputHandler(e.target.name, e.target.value);
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
              onChange={e => {
                inputHandler(e.target.name, e.target.value);
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
