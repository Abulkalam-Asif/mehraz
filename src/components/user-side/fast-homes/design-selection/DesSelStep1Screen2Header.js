"use client";
import { FaChevronLeft } from "react-icons/fa6";
import Image from "next/image";
import { jumpToIcon, maximizedViewIcon, minimizedViewIcon } from "@/assets";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { DesSelStep1Screen2JumpToModal, ULinkButton2 } from "@/components";
import { useEffect, useRef, useState } from "react";
import useRPS from "@/hooks/useRPS";

const DesSelStep1Screen2Header = ({
  searchString,
  setSearchString,
  view,
  changeView,
  cities,
  styles,
}) => {
  const { router, pathname, searchParams } = useRPS();

  const [mobSearchbarExpanded, setMobSearchbarExpanded] = useState(false);
  const searchbarDivRef = useRef(null);

  const handleClickOutside = e => {
    if (
      searchbarDivRef.current &&
      !searchbarDivRef.current.contains(e.target)
    ) {
      setMobSearchbarExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobSearchbarExpanded]);

  const changeViewHandler = () => {
    changeView(view === "max" ? "min" : "max");
  };

  const moveToScreen1Handler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("screen", "1");
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
        <div className="flex items-center gap-5 lg:mr-16">
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
          <div className="relative lg:hidden">
            <input
              value={searchString}
              onChange={e => setSearchString(e.target.value)}
              type="text"
              className="text-lg xl:text-base border border-black rounded-full pl-4 pr-10 py-2 xl:py-1 placeholder:text-black placeholder:opacity-60"
              placeholder="SEARCH"
            />
            <FaMagnifyingGlass
              width={20}
              className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-auto xl:w-4 text-black opacity-50"
            />
          </div>
          <div className="lg:hidden flex flex-col items-center gap-0.5">
            <span className="text-[#6A6A6A]">Learn More</span>
            <ULinkButton2
              text="all"
              href="/"
              className="ml-auto xl:text-sm text-white bg-[#323232] border border-[#323232] shadow-btn px-12 py-1 transition-colors duration-300 hover:bg-white hover:text-[#323232] hover:shadow-none"
            />
          </div>
        </div>
        <div
          ref={searchbarDivRef}
          className={`hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 items-center justify-end ${
            mobSearchbarExpanded ? "w-full" : "w-0"
          }`}>
          <input
            value={searchString}
            onChange={e => setSearchString(e.target.value)}
            type="text"
            className={`bg-white text-base placeholder:text-black placeholder:opacity-60 absolute right-0 rounded-full top-1/2 -translate-y-1/2 w-0 transition-[width] ${
              mobSearchbarExpanded
                ? "w-full py-4 px-4 border-2 border-black/50"
                : "w-0"
            }`}
            placeholder="SEARCH"
          />
          <button
            onClick={() => setMobSearchbarExpanded(true)}
            className=" focus:outline-0">
            <FaMagnifyingGlass
              width={20}
              className={`absolute top-1/2 -translate-y-1/2 w-8 h-auto text-black opacity-50 transition-[right] duration-300 ${
                mobSearchbarExpanded ? "right-4" : "right-0"
              }`}
            />
          </button>
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
