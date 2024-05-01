const RPServicesInput = ({
  value,
  productType,
  rates,
  fieldType,
  rateId,
  inputHandler,
  currentDesignAreaInSqFt,
  min,
  max,
}) => {
  const serviceInputHandler = value => {
    const updatedRates = rates.map(rate => {
      if (rate.id === rateId) {
        rate[fieldType] = value;
        if (fieldType === "rate") {
          rate.cost = Math.round(rate.rate * currentDesignAreaInSqFt);
        }
      }
      return rate;
    });
    inputHandler(productType, updatedRates);
  };
  return (
    <>
      <input
        value={value}
        type="number"
        onBlur={e => {
          if (e.target.value < min) {
            serviceInputHandler(min);
          } else if (e.target.value > max) {
            serviceInputHandler(max);
          } else {
            serviceInputHandler(Number(e.target.value));
          }
        }}
        onChange={e => serviceInputHandler(Number(e.target.value))}
        className="w-full border-2 text-sm border-accent-1-base rounded-md px-2 py-0.5"
        min={min}
        max={max}
        step={"any"}
      />
    </>
  );
};

export default RPServicesInput;
