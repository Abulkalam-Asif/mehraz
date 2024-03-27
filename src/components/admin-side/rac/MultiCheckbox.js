const MultiCheckbox = ({
  className = "",
  outerClassName = "",
  options,
  inputName,
  checkedBoxes = [],
  onChange,
  title = "",
  required = false,
}) => {
  return (
    <>
      <div className={outerClassName}>
        <h3 className="text-accent-1-dark">
          {title}
          {required && <span className="text-red-500"> *</span>}
        </h3>
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
                  onChange={e => {
                    const { checked } = e.target;
                    let updatedCheckedBoxes;
                    if (checked) {
                      updatedCheckedBoxes = [...checkedBoxes, id];
                    } else {
                      updatedCheckedBoxes = checkedBoxes.filter(
                        checkedItem => checkedItem !== id,
                      );
                    }
                    onChange(e.target.name, updatedCheckedBoxes);
                  }}
                />
                <label htmlFor={id}>{name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MultiCheckbox;
