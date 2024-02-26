const RACSelect = ({
  label = "",
  idHtmlFor = "",
  name = "",
  value = "",
  options = [],
  inputHandler = null,
}) => {
  return (
    <>
      <div className="flex flex-col space-y-1">
        <label htmlFor={idHtmlFor} className="text-accent-1-dark">
          {label}
        </label>
        <select
          name={name}
          id={idHtmlFor}
          value={value}
          onChange={inputHandler}
          className="border-2 text-base border-accent-1-base rounded-md px-4 py-1">
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default RACSelect;
