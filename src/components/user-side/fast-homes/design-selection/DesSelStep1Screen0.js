"use client";
import { motion } from "framer-motion";

const DesSelStep1Screen0 = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative z-[1] min-h-full w-full flex items-center justify-center bg-fast-homes bg-no-repeat bg-center bg-cover before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-[#000000e6] before:to-[#3c3c3cb3]">
      <div className="flex flex-col gap-3 p-8 lg:max-w-sm lg:flex-col-reverse">
        <h2 className="text-[#DEDEDE] text-4xl lg:text-6xl sm:text-5xl">
          STEP 1/3
        </h2>
        <h1 className="text-white text-6xl lg:text-4xl sm:text-3.5xl font-bold lg:border-b lg:border-b-white lg:pb-3">
          HOME STYLE SELECTION
        </h1>
      </div>
    </motion.div>
  );
};

export default DesSelStep1Screen0;
