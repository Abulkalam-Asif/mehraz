const AdminSelect = ({
  label = "",
  idHtmlFor = "",
  name = "",
  value = "",
  options = [],
  inputHandler = () => {},
  required = false,
}) => {
  return (
    <>
      <div className="w-full flex flex-col space-y-1">
        <label htmlFor={idHtmlFor} className="text-accent-1-dark">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
        <select
          name={name}
          id={idHtmlFor}
          value={value}
          onChange={e => {
            inputHandler(e.target.name, e.target.value);
          }}
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

export default AdminSelect;
