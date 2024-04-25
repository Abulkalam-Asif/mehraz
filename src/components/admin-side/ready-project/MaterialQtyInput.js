const MaterialQtyInput = ({
  value,
  min = 0,
  max = 0,
  inputHandler,
  disabled = false,
}) => {
  return (
    <>
      <input
        value={value}
        disabled={disabled}
        type="number"
        onBlur={e => {
          if (e.target.value < min) {
            inputHandler(min);
          }
        }}
        onChange={e => {
          if (e.target.value > max) {
            inputHandler(max);
          } else {
            inputHandler(Number(e.target.value));
          }
        }}
        className="w-full border-2 text-sm border-accent-1-base rounded-md px-2 py-0.5"
        min={min}
        max={max}
      />
    </>
  );
};

export default MaterialQtyInput;
