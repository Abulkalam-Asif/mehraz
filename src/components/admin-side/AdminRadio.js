const AdminRadio = ({
  radios = [],
  name = "",
  label = "",
  adminRadioValue = null,
  inputHandler = () => {},
  required = false,
}) => {
  return (
    <>
      <div>
        <h3 className="text-accent-1-dark mb-1">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </h3>
        {radios.map(({ label, value }) => (
          <div key={value} className="space-x-2">
            <input
              type="radio"
              id={value}
              value={value}
              name={name}
              checked={adminRadioValue === value}
              onChange={e => {
                inputHandler(e.target.name, e.target.value);
              }}
            />
            <label htmlFor={value} className="text-sm">
              {label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminRadio;
