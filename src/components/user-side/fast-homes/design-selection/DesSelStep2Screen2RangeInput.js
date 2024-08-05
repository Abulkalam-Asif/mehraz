const DesSelStep2Screen2RangeInput = ({
  budget,
  setBudget,
  min,
  max,
  inputStep,
  currency,
}) => {
  const budgetPointsDiff = (max - min) / 10;
  const budgetPoints = [min];
  for (let i = 1; i < 10; i++) {
    budgetPoints.push(Math.round((min + budgetPointsDiff * i) / 10) * 10);
  }
  budgetPoints.push(max);

  return (
    <>
      <div>
        <div className="relative text-[#2F2F2F]">
          <span className="absolute z-[1] left-0 -translate-x-full lg:translate-x-0 -top-2 -translate-y-full bg-[#EFEFEF] py-1 px-4 rounded-full xl:text-sm">
            <span className="italic">{currency}&nbsp;&nbsp;</span>
            {min} Lakh
          </span>
          <span
            className="lg:hidden absolute z-[2] top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2F2F2F] text-white py-1 px-4 rounded-full xl:text-sm whitespace-nowrap"
            style={{
              left: `${Math.max(
                0,
                Math.min(100, ((budget - min) / (max - min)) * 100),
              )}%`,
            }}>
            <span className="italic">{currency}&nbsp;&nbsp;</span>
            {budget} Lakh
          </span>
          <input
            type="range"
            name=""
            id=""
            min={min}
            max={max}
            step={inputStep}
            value={budget}
            onChange={e => setBudget(e.target.value)}
            className="desSelStep2Screen2Range cursor-pointer"
          />
          <span className="absolute z-[1] right-0 translate-x-full lg:translate-x-0 -top-2 -translate-y-full bg-[#EFEFEF] py-1 px-4 rounded-full xl:text-sm">
            <span className="italic">{currency}&nbsp;&nbsp;</span>
            {max} Lakh
          </span>
        </div>
        <div className="shadow-[1px_3px_3px_0px_rgba(0,0,0,0.15)] border border-[#EFEFEF] rounded-lg lg:rounded-full py-3 lg:py-2 px-4 mt-1">
          <div className="flex justify-between xl:text-sm">
            {budgetPoints.map((point, index) => (
              <span
                key={index}
                className={`text-[#2F2F2F] ${
                  index !== 0 && index !== budgetPoints.length - 1
                    ? ""
                    : "opacity-0"
                }
                ${index % 2 === 0 ? "lg:opacity-0" : ""}
                `}>
                {point}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DesSelStep2Screen2RangeInput;
