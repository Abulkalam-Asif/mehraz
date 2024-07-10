"use client";
import {
  bookmarkGrayFilledIcon,
  bookmarkGrayIcon,
  circleCheckIcon,
  shareGrayIcon,
} from "@/assets";
import Image from "next/image";
import { UButton, DesSelStep1Screen2ProjectSlideRates } from "@/components";
import { useState } from "react";

const DesSelStep1Screen2ProjectSlideMin = ({
  project,
  selectProjectHandler,
  seeMoreHandler,
  isLocalStorageBookmarked,
  bookmarkLocalStorageHandler,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(isLocalStorageBookmarked);
  return (
    <>
      <div
        key={project.id}
        className="mx-1 mb-2 rounded-lg shadow-btn border border-black border-opacity-25 overflow-hidden">
        <div className="h-[30vh]">
          <Image
            src={project.image}
            width={500}
            height={500}
            className="h-full w-full object-cover"
            alt="Project image"
          />
        </div>
        <div className="h-[42vh] flex flex-col px-3 overflow-y-auto">
          <div className="flex items-end gap-2 text-black/90 w-full py-1">
            <h1 className="text-sm font-bold text-center">
              {project.style.name}
            </h1>
            <h2 className="text-xxs capitalize text-center">
              {project.style.budget.toLowerCase()} Cost
            </h2>
            <button
              className="text-sm font-bold underline ml-auto uppercase"
              onClick={seeMoreHandler}>
              see more
            </button>
          </div>
          <hr className="border-black/20" />
          <p className="text-sm xl:text-xs text-justify mt-1 flex-1">
            {project.description}
          </p>
          <div className="uppercase text-black/90 mt-2">
            <h3 className="text-sm font-bold">rates</h3>
            <div className="flex">
              <div className="w-full flex items-center justify-between gap-1 border border-black/30 rounded p-1 relative before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:shadow-btn before:opacity-60">
                <div className="text-sm xl:text-xs space-y-1 font-bold">
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
              <div className="w-12 flex flex-col items-center justify-center gap-4">
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
                    className="w-6 h-auto"
                    alt="Bookmark"
                  />
                </button>
                <button>
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
          <div className="mt-2 pb-1">
            <UButton
              onClick={selectProjectHandler}
              className="w-full flex items-center justify-center gap-2 text-base font-bold py-1.5 px-4"
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
      </div>
    </>
  );
};

export default DesSelStep1Screen2ProjectSlideMin;
