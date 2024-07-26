"use client";
import {
  UButton,
  DesSelStep2Screen2InputDiv,
  UserScreenSpinner,
} from "@/components";
import getBudgetRange from "@/Firebase/user-side/design-selection/step-2/getBudgetRange";
import useRPS from "@/hooks/useRPS";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";

const currencies = [
  { label: "PKR", value: "PKR", valueInPkr: 1 },
  { label: "USD", value: "USD", valueInPkr: 175 },
];
const DesSelStep2Screen2 = () => {
  const { router, pathname, searchParams } = useRPS();
  const [budget, setBudget] = useState(0);
  const [currency, setCurrency] = useState("PKR");
  const [budgetRange, setBudgetRange] = useState(null);

  useEffect(() => {
    const fetchBudgetRange = async () => {
      try {
        const budgetRange = await getBudgetRange();
        setBudgetRange(budgetRange);
        const defaultBudget = (budgetRange.min + budgetRange.max) / 2;
        setBudget(defaultBudget);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBudgetRange();
  }, []);

  const nextStepHandler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("screen", "3");
    newSearchParams.set("budget", budget);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const moveToScreen1Handler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("screen", "1");
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return !budgetRange ? (
    <UserScreenSpinner />
  ) : (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-full w-full max-w-7xl lg:max-w-xl mx-auto px-8 py-12 lg:py-8 sm:p-4">
        <div className="flex justify-between items-center lg:flex-col">
          <div className="flex items-center gap-6 lg:gap-2 lg:self-start">
            <button
              onClick={moveToScreen1Handler}
              className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn">
              <FaChevronLeft size={28} className="w-7 h-auto lg:w-5 sm:w-4" />
            </button>
          </div>
          <div className="text-[#2F2F2F] uppercase text-center">
            <h1 className="text-3xl lg:text-2xl xs:text-lg font-bold">
              set your budget
            </h1>
            <h2 className="lg:text-sm xs:text-xxs text-balance">
              See homes OF utmost Comfort & Experience per your budget
            </h2>
          </div>
          <div></div>
        </div>
        <div className="px-40 lg:px-0">
          <DesSelStep2Screen2InputDiv
            min={budgetRange.min}
            max={budgetRange.max}
            budget={budget}
            setBudget={setBudget}
            inputStep={5}
            currency={currency}
            setCurrency={setCurrency}
            currencies={currencies}
          />
        </div>
        <div className="mt-24 lg:mt-12">
          <p className="text-[#2F2F2F]/65 text-center uppercase lg:text-sm xs:text-xs">
            All figures are in <b>lakhs</b> , 1 <i>lakh</i> = 100,000
          </p>
          <hr className="border-black/10 mt-3 mb-12 xs:mb-8" />
          <div className="grid grid-cols-3 lg:grid-cols-1 items-center lg:gap-8">
            <div className="col-span-2 lg:col-span-1 justify-self-end lg:justify-self-center uppercase text-[#2F2F2F]">
              <span className="text-xl xl:text-lg lg:text-base sm:text-sm mr-4">
                my budget{" "}
              </span>
              <span className="border border-black/40 py-2 px-8 rounded-full text-2xl xl:text-1.5xl lg:text-xl sm:text-base">
                <i>{currency}</i>{" "}
                {budget < 100 ? budget : (budget / 100).toFixed(2)}{" "}
                <span>{budget < 100 ? "Lakh" : "Crore"}</span>
              </span>
            </div>
            <UButton
              onClick={nextStepHandler}
              text="next"
              color="gray-white"
              className="text-lg xl:text-base sm:text-sm px-12 lg:px-8 py-3 lg:py-2 mx-auto"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DesSelStep2Screen2;
