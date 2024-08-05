"use client";
import { bookmarkGrayFilledIcon, bookmarkGrayIcon } from "@/assets";
import Image from "next/image";
import { useState } from "react";

const DesSelStep2Screen3DesignSlideMinMobile = ({
  design,
  seeMoreHandler,
  isLocalStorageBookmarked,
  bookmarkLocalStorageHandler,
  selectDesignHandler,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(isLocalStorageBookmarked);
  return (
    <>
      <div className="rounded-lg shadow-btn border border-black border-opacity-25 overflow-hidden">
        <div className="relative h-[16vh]">
          <Image
            src={design.image}
            width={500}
            height={500}
            className="h-full w-full object-cover"
            alt="Project image"
          />
          <div className="absolute w-full bottom-0 right-0 px-2 hidden lg:block bg-gradient-to-r from-white/0 from-50% to-white to-90%">
            <button
              className="p-1 block ml-auto"
              onClick={() => {
                bookmarkLocalStorageHandler();
                setIsBookmarked(prevState => !prevState);
              }}>
              <Image
                src={isBookmarked ? bookmarkGrayFilledIcon : bookmarkGrayIcon}
                width={14}
                height={14}
                className="w-3.5 h-auto"
                alt="Bookmark"
              />
            </button>
          </div>
        </div>
        <div className="h-[20vh] flex flex-col overflow-y-auto">
          <h1 className="text-xs font-bold text-center uppercase">
            project details
          </h1>
          <div className="uppercase text-black/90 mt-1 w-full">
            <div className="block">
              <div className="w-full flex items-center justify-between gap-1 border border-black/30 rounded px-2 py-0.5 text-xs sm:text-xxs xs:text-xxxs">
                <div className="block space-y-0.5 sm:space-y-0 font-bold">
                  <h4>design</h4>
                  <h4>build</h4>
                </div>
                <div className="space-y-0.5 sm:space-y-0 font-bold bg-[#EFEFEF]/70 px-2 rounded">
                  <h4>PKR {design.designCost}</h4>
                  <h4>PKR {design.constructionCost}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 pb-2 flex flex-col items-center gap-2 text-sm sm:text-xs xs:text-xxs px-4">
            <button
              onClick={seeMoreHandler}
              className="bg-[#D9BF77] px-4 py-1 rounded-full shadow-btn uppercase w-full">
              see more
            </button>
            <button
              onClick={selectDesignHandler}
              className="bg-[#D9BF77] px-4 py-1 rounded-md shadow-btn uppercase w-full">
              get designed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesSelStep2Screen3DesignSlideMinMobile;
