const FreeProjectInputBox = ({
  label = "",
  idHtmlFor = "",
  name = "",
  value = "",
  type = "text",
  inputHandler = null,
  className = "",
}) => {
  return (
    <>
      <div className={`flex flex-col space-y-1 ${className}`}>
        <label
          htmlFor={idHtmlFor}
          className="text-lg font-medium uppercase text-accent-1-extra-dark">
          {label}
        </label>
        {(type === "text" || type === "number") && (
          <input
            type={type}
            className="border-2 text-base border-accent-1-base rounded-md px-4 py-1"
            id={idHtmlFor}
            name={name}
            value={value}
            onChange={inputHandler}
            autoComplete="off"
          />
        )}{" "}
        {type === "textarea" && (
          <textarea
            className="flex-1 border-2 text-base border-accent-1-base rounded-md px-4 py-1"
            id={idHtmlFor}
            name={name}
            value={value}
            onChange={inputHandler}
            autoComplete="off"
          />
        )}
      </div>
    </>
  );
};

export default FreeProjectInputBox;
