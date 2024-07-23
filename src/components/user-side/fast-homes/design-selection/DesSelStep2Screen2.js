"use client";
import { UButton, DesSelStep2Screen2InputDiv } from "@/components";
import getBudgetRange from "@/Firebase/user-side/design-selection/step-2/getBudgetRange";
import useRPS from "@/hooks/useRPS";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";

const DesSelStep2Screen2 = () => {
  const { router, pathname, searchParams } = useRPS();
  const [budget, setBudget] = useState(75000);
  const [budgetRange, setBudgetRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    const fetchBudgetRange = async () => {
      try {
        const budgetRange = await getBudgetRange();
        setBudgetRange({
          min: budgetRange.min,
          max: budgetRange.max,
        });
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
    newSearchParams.set("screen", "2");
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const skipAndNextStepHandler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const moveToStep1Screen2Handler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", "1");
    newSearchParams.set("screen", "2");
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-full w-full max-w-7xl lg:max-w-xl mx-auto px-8 py-12 sm:p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6 lg:gap-2">
            <button
              onClick={moveToStep1Screen2Handler}
              className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn">
              <FaChevronLeft size={28} className="w-7 h-auto lg:w-5 sm:w-4" />
            </button>
          </div>
          <div className="text-[#2F2F2F] uppercase text-center">
            <h1 className="text-3xl font-bold">set your budget</h1>
            <h2>See homes OF utmost Comfort & Experience per your budget</h2>
          </div>
          <div></div>
        </div>
        <div className="px-40">
          <DesSelStep2Screen2InputDiv
            min={budgetRange.min}
            max={budgetRange.max}
            budget={budget}
            setBudget={setBudget}
            inputStep={5}
            currency={"PKR"}
          />
        </div>
        <div className="mt-32">
          <p className="text-[#2F2F2F]/65">
            All figures are in lakhs , 1 lakh = 100,000
          </p>
          <hr className="border-black/10" />
          <div className="grid grid-cols-3">
            <div className="col-start-2 uppercase">
              my budget{" "}
              <span>
                <i>PKR&nbsp;&nbsp;</i>
                {budget}
              </span>
            </div>
            <UButton
              onClick={nextStepHandler}
              text="set"
              color="gray-white"
              className="text-lg px-12 py-3 mx-auto"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DesSelStep2Screen2;
