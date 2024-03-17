const AdminRadio = ({
  radios = [],
  name = "",
  label = "",
  adminRadioValue = null,
  inputHandler,
}) => {
  return (
    <>
      <div>
        <h3 className="text-accent-1-dark mb-1">{label}</h3>
        {radios.map(({ label, value }) => (
          <div key={value} className="space-x-2">
            <input
              type="radio"
              id={value}
              value={value}
              name={name}
              checked={adminRadioValue === value}
              onChange={inputHandler}
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
