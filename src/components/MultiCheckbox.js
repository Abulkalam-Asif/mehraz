const MultiCheckbox = ({
  className,
  options,
  inputName,
  checkedBoxes = [],
  onChange,
}) => {
  return (
    <>
      <div className={`${className}`}>
        {options?.map(({ id, name }) => {
          const isChecked = checkedBoxes.includes(id);
          return (
            <div key={id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={id}
                name={inputName}
                checked={isChecked}
                onChange={(e) => {
                  const { checked } = e.target;
                  let updatedCheckedBoxes;
                  if (checked) {
                    updatedCheckedBoxes = [...checkedBoxes, id];
                  } else {
                    updatedCheckedBoxes = checkedBoxes.filter(
                      (checkedItem) => checkedItem !== id
                    );
                  }
                  onChange(e, updatedCheckedBoxes);
                }}
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
