const ListInput = ({
  label = "",
  name = "",
  values = [],
  inputHandler = () => {},
  className = "",
}) => {
  return (
    <>
      <div className={`flex flex-col space-y-1 overflow-y-auto ${className}`}>
        <span className="text-accent-1-dark">{label}</span>
        <div className="space-y-2">
          {values?.map((spec, index) => (
            <div key={index} className="flex space-x-2 items-center">
              <span>{index + 1}.</span>
              <input
                type="text"
                onChange={e => {
                  const newSpecs = [...values];
                  newSpecs[index] = e.target.value;
                  inputHandler(name, newSpecs);
                }}
                value={spec}
                className="w-full border-2 text-sm border-accent-1-base rounded-md px-4 py-1"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListInput;
