const MultiCheckbox = ({
  className,
  options,
  inputName,
  checked = [],
  onChange,
}) => {
  console.log(checked);
  return (
    <>
      <div className={`${className}`}>
        {options?.map(({ id, name }) => {
          return (
            <div key={id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={id}
                name={inputName}
                checked={checked?.find((item) => item.id === id)}
                onChange={(e) =>
                  onChange(
                    e,
                    checked?.find((item) => item.id === id)
                      ? checked.filter((item) => item.id !== id)
                      : [...checked, { id, name }]
                  )
                }
              />
              <label htmlFor={id}>{name}</label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MultiCheckbox;
