"use client";
import {
  bookmarkGrayFilledIcon,
  bookmarkGrayIcon,
  circleCheckIcon,
  shareGrayIcon,
} from "@/assets";
import Image from "next/image";
import DesSelStep1Screen2ProjectSlideRates from "./DesSelStep1Screen2ProjectSlideRates";
import { UButton } from "@/components";
import { useState } from "react";

const DesSelStep1Screen2ProjectSlideMax = ({
  project,
  isLocalStorageBookmarked,
  bookmarkLocalStorageHandler,
  selectProjectHandler,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(isLocalStorageBookmarked);
  return (
    <>
      <div
        key={project.id}
        className="h-full flex rounded-lg shadow-btn border border-black border-opacity-25 overflow-hidden lg:flex-col-reverse">
        <div className="h-full w-2/5 xl:w-1/2 lg:w-full lg:h-3/5 flex flex-col lg:grid lg:grid-cols-1 overflow-y-auto">
          <div className="text-black/90 lg:w-full px-5 pt-4 sm:px-2">
            <h1 className="text-xl xl:text-lg sm:text-base font-bold text-center">
              {project.style.name}
            </h1>
            <h2 className="text-xs sm:text-xxs capitalize text-center">
              {project.style.budget.toLowerCase()} Cost
            </h2>
          </div>
          <p className="text-lg xl:text-base sm:text-sm text-justify mt-1 px-5 sm:px-2 flex-1 lg:w-full">
            {project.description}
          </p>
          <div className="uppercase text-black/90 mt-4 sm:mt-2 px-5 sm:px-0 lg:w-full">
            <h3 className="text-lg xl:text-base font-bold lg:text-center">
              rates
            </h3>
            <div className="grid grid-cols-7 lg:block">
              <div className="col-span-6 flex items-center justify-between gap-1 border border-black/30 rounded p-2 relative before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:shadow-btn before:opacity-60">
                <div className="text-sm space-y-2 font-bold">
                  <h4>
                    design <span className="text-xxxs">avg.</span>
                  </h4>
                  <h4>
                    construction <span className="text-xxxs">avg.</span>
                  </h4>
                </div>
                <DesSelStep1Screen2ProjectSlideRates
                  productRates={project.productRates}
                  constructionRates={project.constructionRates}
                />
              </div>
              <div className="flex lg:hidden flex-col items-center justify-center gap-4">
                <button
                  onClick={() => {
                    bookmarkLocalStorageHandler();
                    setIsBookmarked(prevState => !prevState);
                  }}>
                  <Image
                    src={
                      isBookmarked ? bookmarkGrayFilledIcon : bookmarkGrayIcon
                    }
                    width={28}
                    height={28}
                    className="w-7 xl:w-6 h-auto"
                    alt="Bookmark"
                  />
                </button>
                <button
                  onClick={() => {
                    navigator.share({
                      title: "Fast Homes",
                      text: project.description,
                      url: window.location.href,
                    });
                  }}>
                  <Image
                    src={shareGrayIcon}
                    width={32}
                    height={32}
                    className="w-8 xl:w-7 h-auto"
                    alt="Share"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-2 px-5 sm:px-2 pb-4 lg:pb-2 lg:w-full">
            <UButton
              onClick={selectProjectHandler}
              className="w-full flex items-center justify-center gap-2 text-lg xl:text-base font-bold py-1.5 px-4"
              color="gold-gray"
              text={
                <>
                  <Image
                    src={circleCheckIcon}
                    width={24}
                    height={22}
                    className="w-6 h-auto"
                    alt="circle check"
                  />
                  <span>select style</span>
                </>
              }
            />
            <p className="uppercase text-xxs text-[#2f2f2f]/60 text-center mt-2">
              let&apos;s TAKE THIS STYLE for my home
            </p>
          </div>
        </div>
        <div className="h-full w-3/5 xl:w-1/2 lg:w-auto lg:h-2/5 lg:relative">
          <Image
            src={project.image}
            width={500}
            height={500}
            className="h-full w-full object-cover"
            alt="Project image"
          />
          <div className="absolute w-full bottom-0 right-0 px-2 hidden lg:flex justify-end items-center gap-1 bg-gradient-to-r from-white/0 from-30% to-white to-80%">
            {/* TODO: On click, add bookmark and replace bookmarkGrayIcon with bookmarkGrayFilledIcon */}
            <button
              className="p-2"
              onClick={() => {
                bookmarkLocalStorageHandler();
                setIsBookmarked(prevState => !prevState);
              }}>
              <Image
                src={isBookmarked ? bookmarkGrayFilledIcon : bookmarkGrayIcon}
                width={28}
                height={28}
                className="w-6 h-auto"
                alt="Bookmark"
              />
            </button>
            <button
              onClick={() => {
                navigator.share({
                  title: "Fast Homes",
                  text: project.description,
                  url: window.location.href,
                });
              }}
              className="p-2">
              <Image
                src={shareGrayIcon}
                width={32}
                height={32}
                className="w-7 h-auto"
                alt="Share"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesSelStep1Screen2ProjectSlideMax;
