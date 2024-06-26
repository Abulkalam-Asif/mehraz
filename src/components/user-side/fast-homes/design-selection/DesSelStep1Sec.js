"use client";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import DesSelStep1Screen2 from "./DesSelStep1Screen2";
import DesSelStep1Screen3 from "./DesSelStep1Screen3";

const DesSelStep1Sec = ({ screen, cities, styles }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (params.get("screen") === "1") {
      // Hides the step intro screen after 3 seconds
      const screen1Timeout = setTimeout(() => {
        const newParams = new URLSearchParams({
          category: params.get("category") || "",
          step: "1",
          screen: "2",
        });
        router.push(`${pathname}?${newParams.toString()}`);
      }, 3000);

      return () => clearTimeout(screen1Timeout);
    }
  }, [searchParams]);

  return (
    <>
      {screen === "1" ? (
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
      ) : screen === "2" ? (
        <>
          <DesSelStep1Screen2 cities={cities} styles={styles} />
        </>
      ) : (
        screen === "3" && <DesSelStep1Screen3 />
      )}
    </>
  );
};

export default DesSelStep1Sec;
