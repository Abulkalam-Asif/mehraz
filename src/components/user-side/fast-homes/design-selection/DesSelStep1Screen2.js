"use client";
import {
  DesSelStep1Screen2InputBox,
  DesSelStep1Screen2StylesModal,
  ULinkButton2,
  USelect,
} from "@/components";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRight, FaChevronLeft } from "react-icons/fa6";

const DesSelStep1Screen2 = ({ cities, styles }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const defaultStep1Screen2Data = {
    city: "",
    styleCost: "",
    style: "",
    description: "",
  };

  const [step1Screen2Data, setStep1Screen2Data] = useState(
    defaultStep1Screen2Data,
  );
  const step1Screen2DataInputHandler = (key, value) => {
    setStep1Screen2Data(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    // Reset style when styleCost changes so that user can select new style according to new styleCost
    setStep1Screen2Data(prevState => ({
      ...prevState,
      style: "",
    }));
  }, [step1Screen2Data.styleCost]);

  // Modal States and functions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(prevState => !prevState);

  const nextStepHandler = () => {
    const newParams = new URLSearchParams({
      category: searchParams.get("category") || "upto_18",
      step: "1",
      screen: "3",
      city: step1Screen2Data.city,
      styleCost: step1Screen2Data.styleCost,
      style: step1Screen2Data.style,
      description: step1Screen2Data.description,
    });
    router.push(`${pathname}?${newParams.toString()}`);
  };
  const skipAndNextStepHandler = () => {
    const newParams = new URLSearchParams({
      category: searchParams.get("category") || "upto_18",
      step: "1",
      screen: "3",
      city: "",
      styleCost: "",
      style: "",
      description: "",
    });
    router.push(`${pathname}?${newParams.toString()}`);
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
            <Link
              href={"/fast-homes"}
              className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn">
              <FaChevronLeft size={24} className="w-6 h-auto sm:w-4" />
            </Link>
            <h2 className="text-[#6A6A6A] text-3xl xl:text-2xl lg:text-3xl sm:text-2xl">
              STEP 1/3
            </h2>
          </div>
          <div className="text-center lg:hidden">
            <h1 className="text-[#242424] text-3.5xl xl:text-3xl font-bold">
              HOME STYLE SELECTION
            </h1>
            <h3 className="text-[#2F2F2F] text-lg xl:text-base uppercase">
              Tell us how your home should <b>look</b> <br /> so we find perfect
              fit for you ...
            </h3>
          </div>
          <div>
            <div className="lg:hidden text-[#6A6A6A] flex flex-col items-end mb-2">
              <h3 className="text-xl xl:text-lg font-semibold">
                Make Right Home Decisions
              </h3>
              <h4 className="xl:text-sm border-b border-b-black border-opacity-30 pb-1">
                Know About Home Design Options & More?
              </h4>
            </div>
            <div className="hidden lg:flex text-[#6A6A6A] flex-col items-end mb-1">
              <h3 className="text-lg sm:text-sm font-semibold">
                Make Right Decisions
              </h3>
              <h4 className="text-sm sm:text-xs border-b border-b-black border-opacity-30">
                Know Style Options & More?
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
          <DesSelStep1Screen2InputBox label={"city"}>
            <USelect
              options={
                cities
                  ? [
                      {
                        label: "CHOOSE",
                        value: "",
                      },
                      ...cities.map(city => ({
                        label: city.name,
                        value: city.id,
                      })),
                    ]
                  : []
              }
              selectedOption={step1Screen2Data.city}
              selectHandler={value =>
                step1Screen2DataInputHandler("city", value)
              }
            />
          </DesSelStep1Screen2InputBox>
          <FaArrowRight
            size={40}
            className="text-white opacity-25 w-10 h-auto lg:hidden"
          />
          <DesSelStep1Screen2InputBox label={"style cost"}>
            <USelect
              options={[
                { label: "CHOOSE", value: "" },
                { label: "LOW", value: "LOW" },
                { label: "MEDIUM", value: "MEDIUM" },
                { label: "HIGH", value: "HIGH" },
              ]}
              selectedOption={step1Screen2Data.styleCost}
              selectHandler={value =>
                step1Screen2DataInputHandler("styleCost", value)
              }
            />
          </DesSelStep1Screen2InputBox>

          <FaArrowRight
            size={40}
            className="text-white opacity-25 w-10 h-auto lg:hidden"
          />
          <DesSelStep1Screen2InputBox label={"choose"}>
            <button
              onClick={toggleModal}
              className="text-2xl xl:text-xl py-3 sm:py-2 px-12 sm:px-6 bg-[#8D8E97] rounded-full uppercase text-white shadow-btn font-bold border-2 border-white border-opacity-60 transition-colors duration-300 hover:bg-white hover:text-[#000000a6] hover:border-[#000000a6]">
              {step1Screen2Data.style === ""
                ? "styles"
                : styles.find(style => style.id === step1Screen2Data.style)
                    .name}
            </button>
          </DesSelStep1Screen2InputBox>
        </div>
        <div className="flex flex-col items-center w-full gap-2 mt-12 lg:mt-8">
          <label
            htmlFor="description"
            className="text-[#2F2F2F] text-2xl xl:text-xl sm:text-base">
            <b>DESCRIPTION</b> (Optional)
          </label>
          <div className="w-4/5 sm:w-full relative">
            <span className="absolute top-0.5 right-0.5 text-xs font-medium">
              {step1Screen2Data.description.length}/100
            </span>
            <textarea
              id="description"
              value={step1Screen2Data.description}
              onChange={e =>
                step1Screen2DataInputHandler("description", e.target.value)
              }
              rows={1}
              maxLength={100}
              className="w-full border border-[#282828] border-opacity-60 resize-none rounded-md py-2 pl-3 pr-8 text-xl xl:text-base sm:text-sm placeholder:text-[#2F2F2F] placeholder:text-center placeholder:opacity-60"
              placeholder="TELL US ABOUT THE DESIGN YOU WANT ..."></textarea>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8 lg:gap-6 mt-8 lg:mt-3">
          <button
            onClick={nextStepHandler}
            className="col-start-2 col-span-2 uppercase font-bold text-white bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green rounded-full text-2xl xl:text-xl sm:text-base py-3 w-full text-nowrap relative z-[1] before:bg-white before:rounded-full before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 hover:text-accent-dark-blue hover:before:opacity-100 before:transition-opacity before:duration-300 duration-300">
            select style
          </button>
          <button
            onClick={skipAndNextStepHandler}
            className="uppercase text-[#3F3F3F] text-2xl xl:text-xl py-2 px-4 transition-transform duration-300 hover:scale-105">
            skip?
          </button>
          <Link
            href={"/"}
            className="text-[#3F3F3F] opacity-90 col-start-2 col-span-2 lg:col-span-4 text-center text-base sm:text-sm uppercase font-bold transition-font-weight duration-300 hover:font-normal">
            don&apos;t see your preffered options?
          </Link>
        </div>
      </motion.div>
      {isModalOpen && (
        <DesSelStep1Screen2StylesModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          styles={styles}
          styleCost={step1Screen2Data.styleCost}
          step1Screen2DataInputHandler={step1Screen2DataInputHandler}
        />
      )}
    </>
  );
};

export default DesSelStep1Screen2;
