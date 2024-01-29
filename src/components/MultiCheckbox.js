const MultiCheckbox = ({
  className,
  options,
  inputName,
  checkedBoxes = [],
  onChange,
}) => {
  console.log(options);
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
                checked={checkedBoxes?.find(
                  (checkedItem) => checkedItem === id
                )}
                onChange={(e) =>
                  onChange(
                    e,
                    checkedBoxes?.find((checkedItem) => checkedItem === id)
                      ? checkedBoxes.filter((checkedItem) => checkedItem !== id)
                      : [...checkedBoxes, id]
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
