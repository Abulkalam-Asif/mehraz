const AdminInputBox = ({
  label = "",
  idHtmlFor = "",
  name = "",
  value = "",
  type = "text",
  setInput = null,
  inputHandler = null,
  max = 0,
}) => {
  return (
    <>
      <div className="flex flex-col space-y-1">
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
              if (setInput) {
                setInput(e.target.value);
              }
              if (inputHandler) {
                inputHandler(e);
              }
            }}
            autoComplete="off"
          />
        ) : (
          type === "number" && (
            <input
              type={"number"}
              className="border-2 text-sm border-accent-1-base rounded-md px-4 py-1"
              id={idHtmlFor}
              name={name}
              value={value}
              max={max}
              onInput={e => {
                if (e.target.value > max) {
                  e.target.value = max;
                }
              }}
              onChange={e => {
                if (setInput) {
                  setInput(e.target.value);
                }
                if (inputHandler) {
                  inputHandler(e);
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
