import React from "react";

const RPServicesInput = ({
  value,
  productType,
  rates,
  fieldType,
  rateId,
  inputHandler,
}) => {
  const serviceInputHandler = value => {
    const updatedRates = rates.map(rate => {
      if (rate.id === rateId) {
        rate[fieldType] = value;
      }
      return rate;
    });
  };
  return (
    <>
      <input
        value={value}
        type="number"
        onChange={e => serviceInputHandler(e.target.value)}
        className="w-full border-2 text-sm border-accent-1-base rounded-md px-2 py-0.5"
      />
    </>
  );
};

export default RPServicesInput;
