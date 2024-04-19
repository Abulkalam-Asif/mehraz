import React from "react";

const RPServicesInput = ({
  value,
  productType,
  rates,
  fieldType,
  rateId,
  inputHandler,
  currentDesignAreaInSqFt,
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
        onChange={e => {
          if (e.target.value < 0) e.target.value = 0;
          serviceInputHandler(e.target.value);
        }}
        className="w-full border-2 text-sm border-accent-1-base rounded-md px-2 py-0.5"
        min={0}
        step={"any"}
      />
    </>
  );
};

export default RPServicesInput;
