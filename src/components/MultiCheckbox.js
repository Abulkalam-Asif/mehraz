const MultiCheckbox = ({ className, options, name, checked, onChange }) => {
  return (
    <>
      <div className={`${className}`}>
        {options?.map((option, index) => {
          return (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={option}
                name={name}
                checked={checked?.includes(option)}
                onChange={(e) =>
                  onChange(
                    e,
                    checked?.includes(option)
                      ? checked.filter((item) => item !== option)
                      : [...checked, option]
                  )
                }
              />
              <label htmlFor={option}>{option}</label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MultiCheckbox;
