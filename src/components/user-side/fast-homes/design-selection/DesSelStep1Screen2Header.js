"use client";
import { FaChevronLeft } from "react-icons/fa6";
import Image from "next/image";
import { jumpToIcon, maximizedViewIcon, minimizedViewIcon } from "@/assets";
import { DesSelStep1Screen2JumpToModal, ULinkButton2 } from "@/components";
import { useState } from "react";
import useRPS from "@/hooks/useRPS";

const DesSelStep1Screen2Header = ({ view, changeView, cities, styles }) => {
  const { router, pathname, searchParams } = useRPS();

  const changeViewHandler = () => {
    changeView(view === "max" ? "min" : "max");
  };

  const moveToScreen1Handler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("screen", "1");
    newSearchParams.delete("city");
    newSearchParams.delete("style");
    newSearchParams.delete("styleCost");
    newSearchParams.delete("view");
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  // Modal states and functions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(prevState => !prevState);

  return (
    <>
      <div className="relative flex justify-between items-center">
        <div className="flex items-center gap-10 lg:gap-2">
          <button
            onClick={moveToScreen1Handler}
            className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn">
            <FaChevronLeft size={24} className="w-6 h-auto sm:w-4" />
          </button>
          <button
            onClick={toggleModal}
            className="border lg:border-none border-black rounded flex items-center gap-2 py-1 px-8 lg:px-1 lg:py-0.5 xl:px-4 uppercase hover:shadow-btn transition-shadow duration-300 text-lg xl:text-base">
            <Image
              src={jumpToIcon}
              width={32}
              height={32}
              alt="Jump to icon"
              className="w-8 h-auto xl:w-7 lg:w-12"
            />
            <span>jump to</span>
          </button>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={changeViewHandler}
            className="flex items-center gap-2 p-1 text-lg xl:text-base uppercase">
            <Image
              src={view === "max" ? minimizedViewIcon : maximizedViewIcon}
              width={48}
              height={48}
              alt="Minimized view icon"
              className="w-12 h-auto xl:w-10"
            />
            <span className="lg:hidden">
              {view === "max" ? "minimized view" : "maximized view"}
            </span>
          </button>
          <div className="lg:hidden flex flex-col items-center gap-0.5">
            <span className="text-[#6A6A6A]">Learn More</span>
            <ULinkButton2
              text="all"
              href="/"
              className="ml-auto xl:text-sm text-white bg-[#323232] border border-[#323232] shadow-btn px-12 py-1 transition-colors duration-300 hover:bg-white hover:text-[#323232] hover:shadow-none"
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <DesSelStep1Screen2JumpToModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          cities={cities}
          styles={styles}
        />
      )}
    </>
  );
};

export default DesSelStep1Screen2Header;
