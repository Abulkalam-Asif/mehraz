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
import Chart from "react-google-charts";

const pieChartOptions = {
  legend: "none",
  pieSliceText: "label",
  backgroundColor: "transparent",
  pieSliceBorderColor: "transparent",
  tooltip: {
    textStyle: { color: "#000" },
    showColorCode: true,
  },
};

const pieChartData = [
  ["serice", "cost"],
  ["Service 1", 2000000],
  ["Service 2", 500000],
  ["Service 3", 1000000],
  ["Service 4", 700000],
  ["Service 5", 1000000],
];

const DesSelStep2Screen3DesignSlideMax = ({
  design,
  isLocalStorageBookmarked,
  bookmarkLocalStorageHandler,
  selectDesignHandler,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(isLocalStorageBookmarked);
  const [showChart, setShowChart] = useState(false);
  return (
    <>
      <div
        key={design.id}
        className="h-full flex rounded-lg shadow-btn border border-black border-opacity-25 overflow-hidden lg:flex-col-reverse">
        <div className="h-full w-2/5 xl:w-1/2 lg:w-full lg:h-3/5 flex flex-col lg:grid lg:grid-cols-1 overflow-y-auto">
          <div className="text-black/90 lg:w-full px-5 pt-4 sm:px-2">
            <h1 className="text-xl xl:text-lg sm:text-base font-bold text-center uppercase">
              project details
            </h1>
            <h2 className="text-xs sm:text-xxs capitalize text-center space-x-2">
              <span>{design.style.name.toLowerCase()}</span>
              <span>{design.style.budget.toLowerCase()} Budget</span>
            </h2>
          </div>
          <div className="uppercase text-[#2F2F2F]/60 text-sm sm:text-xs xs:text-xxs px-5 flex items-center justify-evenly xs:justify-between mt-4 lg:mt-2">
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
          <p className="text-lg xl:text-base sm:text-sm text-justify mt-3 lg:mt-1 px-5 sm:px-2 flex-1 lg:w-full">
            {design.description}
          </p>
          <div className="uppercase text-black/90 mt-4 sm:mt-2 px-5 sm:px-0 lg:w-full grid grid-cols-7 lg:block">
            <div className="col-span-6 w-full flex flex-col items-center justify-between gap-1 border border-black/30 rounded p-2 relative before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:shadow-btn before:opacity-60">
              <div className="text-sm font-bold w-full flex items-center justify-between px-3 py-1 border border-black/80 rounded-full">
                <h4>
                  get design <span className="text-xxxs">only</span>
                </h4>
                <h4>PKR {design.designCost}</h4>
              </div>
              <div className="text-sm font-bold w-full flex items-center justify-between px-3 py-1 text-white rounded-full bg-gradient-to-r from-accent-dark-blue to-accent-sea-green opacity-90">
                <h4>build design</h4>
                <h4>PKR {design.constructionCost}</h4>
              </div>
              <button
                className="text-[#2F2F2F] text-xs"
                onClick={() => setShowChart(prevState => !prevState)}>
                Select To See <b>Cost Division</b>
              </button>
            </div>
            <div className="flex lg:hidden flex-col items-center justify-center gap-4">
              <button
                onClick={() => {
                  bookmarkLocalStorageHandler();
                  setIsBookmarked(prevState => !prevState);
                }}>
                <Image
                  src={isBookmarked ? bookmarkGrayFilledIcon : bookmarkGrayIcon}
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
                    text: design.description,
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
          <div className="space-y-2 mt-4 sm:mt-2 px-5 sm:px-2 pb-4 lg:pb-2 lg:w-full">
            <ULinkButton
              href={"/"}
              color="solid-gold"
              text="see details"
              className="w-full text-center text-lg xl:text-base font-bold py-1.5 px-4 rounded-full"
            />
            <UButton
              onClick={selectDesignHandler}
              className="w-full flex items-center justify-center gap-2 text-lg xl:text-base font-bold py-1.5 px-4"
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
            <p className="uppercase text-xxs text-[#2f2f2f]/60 text-center mt-2">
              let&apos;s REALIZE THIS for my home
            </p>
          </div>
        </div>
        <div className="h-full w-3/5 xl:w-1/2 lg:w-auto lg:h-2/5 lg:relative">
          {showChart ? (
            <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-r from-accent-dark-blue to-accent-sea-green">
              <Chart
                className="h-full w-full"
                chartType="PieChart"
                data={pieChartData}
                options={{
                  ...pieChartOptions,
                  width: "100%",
                  height: "100%",
                }}
              />
              <span className="lg:hidden absolute bottom-0 right-0 text-white/50 uppercase text-lg px-4 py-1 border-t border-t-white/50">
                construction cost division
              </span>
            </div>
          ) : (
            <Image
              src={design.image}
              width={500}
              height={500}
              className="h-full w-full object-cover"
              alt="Project image"
            />
          )}
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
                  text: design.description,
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

export default DesSelStep2Screen3DesignSlideMax;
