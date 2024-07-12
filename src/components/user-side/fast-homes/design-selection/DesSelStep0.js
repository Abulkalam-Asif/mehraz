"use client";
import { longArrowIcon } from "@/assets";
import { motion } from "framer-motion";
import Image from "next/image";

const DesSelStep0 = ({ nextStepHandler }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-[1] min-h-full w-full flex items-center justify-center bg-fast-homes bg-no-repeat bg-center bg-cover before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-[#000000e6] before:to-[#3c3c3cb3]">
        <div className="w-full max-w-7xl xl:max-w-5xl lg:max-w-xl flex flex-col items-center mx-auto px-8 sm:px-4 pt-12 pb-8 sm:pb-4 text-white">
          <div className="lg:w-full lg:px-8 sm:px-4">
            <h2 className="flex lg:flex-col text-center items-center gap-x-10 gap-y-2 sm:gap-y-1 text-3.5xl xl:text-3xl lg:text-2xl sm:text-lg xs:text-base border border-white rounded-full border-opacity-50 px-16 lg:px-8 py-1 bg-black bg-opacity-25 lg:w-full">
              <span>home construction costs</span>
              <span>
                depend on <b>two decisions</b>
              </span>
            </h2>
          </div>
          <div className="w-full flex flex-col items-center gap-4 sm:gap-2 mt-8 text-4.5xl xl:text-4xl lg:text-3xl sm:text-1.5xl">
            <hr className="w-full opacity-40" />
            <h1 className="flex lg:flex-col items-center gap-x-10 gap-y-1">
              <span>
                how you want to{" "}
                <b className="text-5xl xl:text-4.5xl lg:text-4xl sm:text-2xl">
                  build
                </b>
              </span>
              <span className="opacity-60 lg:self-end">(grey structure)</span>
            </h1>
            <hr className="w-full opacity-40" />
            <h1 className="flex lg:flex-col items-center gap-x-10 gap-y-1">
              <span>
                how you want it to{" "}
                <b className="text-5xl xl:text-4.5xl lg:text-4xl sm:text-2xl">
                  look
                </b>
              </span>
              <span className="opacity-60 lg:self-end">(finishing)</span>
            </h1>
            <hr className="w-full opacity-40" />
          </div>
          <div className="relative mt-16 pt-4 sm:pt-2">
            <Image
              src={longArrowIcon}
              alt="long arrow"
              className="absolute top-0 left-0 w-full"
            />
            <h3 className="text-center text-3.5xl xl:text-3xl lg:text-2xl sm:text-lg text-accent-gold-light">
              lets set <b>look</b> first, then its <b>build</b>
            </h3>
          </div>
          <button
            onClick={nextStepHandler}
            className="text-black bg-white border border-white px-12 sm:px-8 py-2 text-lg sm:text-base rounded self-end mt-4 lg:mt-8 transition-colors duration-300 hover:bg-transparent hover:text-white">
            SKIP ?
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default DesSelStep0;
