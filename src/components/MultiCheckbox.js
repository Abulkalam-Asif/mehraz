const MultiCheckbox = ({
  className,
  options,
  inputName,
  checked,
  onChange,
}) => {
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
                checked={checked?.includes(id)}
                onChange={(e) =>
                  onChange(
                    e,
                    checked?.includes(id)
                      ? checked.filter((item) => item !== id)
                      : [...checked, id]
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
