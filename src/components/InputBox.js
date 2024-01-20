import React from "react";

const InputBox = ({
  label = "",
  idHtmlFor = "",
  name = "",
  value = "",
  type = "text",
  setInput = null,
  inputHandler = null,
}) => {
  return (
    <>
      <div className="flex flex-col space-y-1">
        <label htmlFor={idHtmlFor} className="text-accent-1-dark">
          {label}
        </label>
        {(type === "text" || type === "number") && (
          <input
            type={type}
            className="border text-sm border-accent-1-dark rounded-md px-4 py-1"
            id={idHtmlFor}
            name={name}
            value={value}
            onChange={(e) => {
              if (setInput) {
                setInput(e.target.value);
              }
              if (inputHandler) {
                inputHandler(e);
              }
            }}
            autoComplete="off"
          />
        )}
      </div>
    </>
  );
};

export default InputBox;
