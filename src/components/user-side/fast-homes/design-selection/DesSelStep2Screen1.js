"use client";
import {
  DesSelStep1Screen1InputBox,
  ULinkButton2,
  DesSelSelect,
  DesSelFloorsSelect,
} from "@/components";
import useRPS from "@/hooks/useRPS";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight, FaChevronLeft } from "react-icons/fa6";

const DesSelStep2Screen1 = ({ areas, floors, familyUnits }) => {
  const { router, pathname, searchParams } = useRPS();
  const categoryParam = searchParams.get("category");

  const defaultStep1Screen2FormData = {
    area: "",
    floors: "",
    familyUnits: "",
    requirements: "",
  };

  const [step2Screen2FormData, setStep2Screen2FormData] = useState(
    defaultStep1Screen2FormData,
  );
  const step2Screen2FormDataInputHandler = (key, value) => {
    setStep2Screen2FormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const nextStepHandler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("screen", "2");
    newSearchParams.set("area", step2Screen2FormData.area);
    newSearchParams.set("floors", step2Screen2FormData.floors);
    newSearchParams.set("familyUnits", step2Screen2FormData.familyUnits);
    newSearchParams.set("requirements", step2Screen2FormData.requirements);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const skipAndNextStepHandler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("screen", "2");
    newSearchParams.set("area", "");
    newSearchParams.set("floors", "");
    newSearchParams.set("familyUnits", "");
    newSearchParams.set("requirements", "");
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
        className="relative min-h-full w-full max-w-7xl lg:max-w-xl mx-auto p-8 sm:p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-10 lg:gap-2">
            <button
              onClick={moveToStep1Screen2Handler}
              className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn">
              <FaChevronLeft size={24} className="w-6 h-auto sm:w-4" />
            </button>
            <h2 className="text-[#6A6A6A] text-3xl xl:text-2xl lg:text-3xl sm:text-2xl">
              STEP 2/3
            </h2>
          </div>
          <div className="text-center lg:hidden">
            <h1 className="text-[#242424] text-3.5xl xl:text-3xl font-bold">
              FINAL HOME SELECTION
            </h1>
            <h3 className="text-[#2F2F2F] text-lg xl:text-base uppercase">
              Tell us how your home should <b>planned</b> <br /> so we find
              perfect fit for you ...
            </h3>
          </div>
          <div>
            <div className="lg:hidden text-[#6A6A6A] flex flex-col items-end mb-2">
              <h3 className="text-xl xl:text-lg font-semibold">
                Make Right Home Decisions
              </h3>
              <h4 className="xl:text-sm border-b border-b-black border-opacity-30 pb-1">
                Click To See Various Building Home Options, More
              </h4>
            </div>
            <div className="hidden lg:flex text-[#6A6A6A] flex-col items-end mb-1">
              <h3 className="text-lg sm:text-sm font-semibold">
                Make Right Decisions
              </h3>
              <h4 className="text-sm sm:text-xs border-b border-b-black border-opacity-30">
                Know Build Options & More?
              </h4>
            </div>
            <ULinkButton2
              text="all"
              href="/"
              className="ml-auto lg:text-sm text-white bg-[#323232] border border-[#323232] shadow-btn px-12 py-1 transition-colors duration-300 hover:bg-white hover:text-[#323232] hover:shadow-none"
            />
          </div>
        </div>
        <h3 className="hidden lg:block text-[#2F2F2F] text-sm sm:text-xs text-center uppercase mt-3">
          Tell us how your home should <b>look</b> <br /> so we find perfect fit
          for you ...
        </h3>
        <div className="bg-transparent relative flex lg:flex-col items-center justify-evenly lg:gap-4 px-8 py-6 sm:p-4 mr-6 lg:mr-2 mt-8 lg:mt-4 before:absolute before:z-[-2] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[#E5CD86] before:shadow-btn before:rounded-full lg:before:rounded-3xl before:border before:border-black before:border-opacity-30 after:absolute after:z-[-1] after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-[#efefef1a] after:translate-x-6 lg:after:translate-x-2 after:translate-y-3 lg:after:translate-y-2 after:shadow-btn after:rounded-full lg:after:rounded-3xl after:border after:border-black after:border-opacity-30">
          <DesSelStep1Screen1InputBox label={"area"}>
            <DesSelSelect
              options={
                areas
                  ? [
                      {
                        label: "CHOOSE",
                        value: "",
                      },
                      ...areas
                        ?.filter(
                          area =>
                            area.category.toUpperCase() ===
                            categoryParam.toUpperCase(),
                        )
                        ?.map(({ id, area, unit }) => ({
                          label: `${area} ${unit.name}`,
                          value: id,
                        })),
                    ]
                  : []
              }
              selectedOption={step2Screen2FormData.area}
              selectHandler={value =>
                step2Screen2FormDataInputHandler("area", value)
              }
            />
          </DesSelStep1Screen1InputBox>
          <FaArrowRight
            size={40}
            className="text-white opacity-25 w-10 h-auto lg:hidden"
          />
          <DesSelStep1Screen1InputBox label={"floors"}>
            <DesSelFloorsSelect
              options={
                floors
                  ? [
                      { label: "CHOOSE", value: "" },
                      ...floors.map(({ id, name }) => ({
                        label: name,
                        value: id,
                      })),
                    ]
                  : []
              }
              selectedOption={step2Screen2FormData.floors}
              selectHandler={value =>
                step2Screen2FormDataInputHandler("floors", value)
              }
            />
          </DesSelStep1Screen1InputBox>

          <FaArrowRight
            size={40}
            className="text-white opacity-25 w-10 h-auto lg:hidden"
          />
          <DesSelStep1Screen1InputBox label={"family units"}>
            <DesSelSelect
              options={
                familyUnits
                  ? [
                      { label: "CHOOSE", value: "" },
                      ...familyUnits.map(({ id, name }) => ({
                        label: name,
                        value: id,
                      })),
                    ]
                  : []
              }
              selectedOption={step2Screen2FormData.familyUnits}
              selectHandler={value =>
                step2Screen2FormDataInputHandler("familyUnits", value)
              }
            />
          </DesSelStep1Screen1InputBox>
        </div>
        <div className="flex flex-col items-center w-full gap-2 mt-12 lg:mt-8">
          <div className="w-4/5 sm:w-full relative">
            <span className="absolute top-0.5 right-0.5 text-xs font-medium">
              {step2Screen2FormData.requirements.length}/200
            </span>
            <textarea
              id="requirements"
              value={step2Screen2FormData.requirements}
              onChange={e =>
                step2Screen2FormDataInputHandler("requirements", e.target.value)
              }
              rows={2}
              maxLength={200}
              className="w-full border border-[#282828] border-opacity-60 resize-none rounded-md py-2 pl-3 pr-8 text-xl xl:text-base sm:text-sm placeholder:text-[#2F2F2F] placeholder:text-center placeholder:opacity-60"
              placeholder="TELL US YOUR RQUIREMENTS OR HOUSE DEVISIONS..."></textarea>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8 lg:gap-6 mt-8 lg:mt-3">
          <button
            onClick={nextStepHandler}
            className="col-start-2 col-span-2 uppercase font-bold text-white bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green rounded-full text-2xl xl:text-xl sm:text-base py-3 w-full text-nowrap relative z-[1] before:bg-white before:rounded-full before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 hover:text-accent-dark-blue hover:before:opacity-100 before:transition-opacity before:duration-300 duration-300">
            set budget
          </button>
          <button
            onClick={skipAndNextStepHandler}
            className="uppercase text-[#3F3F3F] text-2xl xl:text-xl py-2 px-4 transition-transform duration-300 hover:scale-105">
            skip?
          </button>
          <Link
            href={"/"}
            className="col-start-2 col-span-2 lg:col-start-1 lg:col-span-4 text-[#6A6A6A] text-center text-lg xl:text-base sm:text-sm xs:text-xs uppercase">
            <b>Confused Whats Best For You?</b> &#x2018;Chat With Us&#x2019;
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default DesSelStep2Screen1;
