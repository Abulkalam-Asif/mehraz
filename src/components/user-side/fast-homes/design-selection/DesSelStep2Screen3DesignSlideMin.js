"use client";
import {
  bookmarkGrayFilledIcon,
  bookmarkGrayIcon,
  circleCheckIcon,
  shareGrayIcon,
} from "@/assets";
import Image from "next/image";
import { UButton, ULinkButton } from "@/components";
import { useState } from "react";

const DesSelStep2Screen3DesignSlideMin = ({
  design,
  selectDesignHandler,
  seeMoreHandler,
  isLocalStorageBookmarked,
  bookmarkLocalStorageHandler,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(isLocalStorageBookmarked);
  return (
    <>
      <div
        key={design.id}
        className="mx-1 mb-2 rounded-lg shadow-btn border border-black border-opacity-25 overflow-hidden">
        <div className="h-[30vh]">
          <Image
            src={design.image}
            width={500}
            height={500}
            className="h-full w-full object-cover"
            alt="Project image"
          />
        </div>
        <div className="h-[42vh] flex flex-col px-3 xl:px-1 overflow-y-auto">
          <div className="flex items-end gap-2 text-black/90 w-full py-1">
            <h1 className="text-sm xl:text-xs font-bold text-center uppercase">
              project details
            </h1>
            <button
              className="text-sm xl:text-xs font-bold underline ml-auto uppercase"
              onClick={seeMoreHandler}>
              see more
            </button>
          </div>
          <hr className="border-black/20" />
          <p className="text-xs text-justify mt-1 flex-1">
            {design.description}
          </p>
          <div className="uppercase text-[#2F2F2F]/60 text-xs xl:text-xxs px-4 xl:px-1 flex items-center justify-evenly mt-2 xl:mt-1">
            <div className="flex items-center gap-2">
              <span>Area</span>
              <span className="border-2 border-[#2F2F2F]/60 rounded px-1 py-0.5">{`${design.area.area} ${design.area.unit}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Family units</span>
              <span className="border-2 border-[#2F2F2F]/60 rounded px-1 py-0.5">
                {design.familyUnit.name}
              </span>
            </div>
          </div>
          <div className="flex uppercase text-black/90 mt-2 xl:mt-1">
            <div className="w-full flex items-center justify-evenly gap-1 border border-black/30 rounded p-1 relative before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:shadow-btn before:opacity-60">
              <div className="text-sm xl:text-xs space-y-1 xl:space-y-0.5 font-bold">
                <h4>
                  get design <span className="text-xxxs">only</span>
                </h4>
                <h4>build design</h4>
              </div>
              <div className="text-sm xl:text-xs space-y-1 xl:space-y-0.5 font-bold bg-[#EFEFEF]/70 py-1 px-2 rounded">
                <h4>PKR {design.designCost}</h4>
                <h4>PKR {design.constructionCost}</h4>
              </div>
            </div>
            <div className="w-12 flex flex-col items-center justify-center gap-2">
              <button
                onClick={() => {
                  bookmarkLocalStorageHandler();
                  setIsBookmarked(prevState => !prevState);
                }}>
                <Image
                  src={isBookmarked ? bookmarkGrayFilledIcon : bookmarkGrayIcon}
                  width={28}
                  height={28}
                  className="w-6 xl:w-5 h-auto"
                  alt="Bookmark"
                />
              </button>
              <button>
                <Image
                  src={shareGrayIcon}
                  width={32}
                  height={32}
                  className="w-7 xl:w-6 h-auto"
                  alt="Share"
                  onClick={() => {
                    navigator.share({
                      title: "Fast Homes",
                      text: design.description,
                      url: window.location.href,
                    });
                  }}
                />
              </button>
            </div>
          </div>
          <div className="mt-2 pb-1 space-y-1">
            <ULinkButton
              href={"/"}
              color="solid-gold"
              text="see details"
              className="w-full text-center text-sm xl:text-xs font-bold py-1 xl:py-0.5 px-4 rounded-full"
            />
            <UButton
              onClick={selectDesignHandler}
              className="w-full flex items-center justify-center gap-2 text-sm xl:text-xs font-bold py-1 xl:py-0.5 px-4"
              color="solid-gold"
              text={
                <>
                  <Image
                    src={circleCheckIcon}
                    width={24}
                    height={22}
                    className="w-6 h-auto"
                    alt="circle check"
                  />
                  <span>get designed</span>
                </>
              }
            />
            <p className="uppercase text-xxs text-[#2f2f2f]/60 text-center">
              let&apos;s realize this for my home
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesSelStep2Screen3DesignSlideMin;
