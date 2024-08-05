import DesSelStep2Screen2NumInput from "./DesSelStep2Screen2NumInput";
import DesSelStep2Screen2RangeInput from "./DesSelStep2Screen2RangeInput";

const DesSelStep2Screen2InputDiv = ({
  min,
  max,
  budget,
  setBudget,
  inputStep,
  currency,
  setCurrency,
  currencies,
}) => {
  return (
    <>
      <div className="space-y-8 mt-8">
        <div>
          {/* TODO: Fetch actual currencies */}
          <DesSelStep2Screen2NumInput
            currencies={currencies}
            selectCurrencyHandler={setCurrency}
            selectedCurrency={currency}
            budget={budget}
            setBudget={setBudget}
            min={min}
            max={max}
            inputStep={inputStep}
          />
        </div>
        <div className="flex items-center justify-center gap-6">
          <hr className="border-black/10 w-1/3" />
          <span className="text-[#2F2F2F] text-2xl">OR</span>
          <hr className="border-black/10 w-1/3" />
        </div>
        <div>
          <DesSelStep2Screen2RangeInput
            min={min}
            max={max}
            budget={budget}
            setBudget={setBudget}
            inputStep={inputStep}
            currency={currency}
          />
        </div>
      </div>
    </>
  );
};

export default DesSelStep2Screen2InputDiv;
