import { fastHomesIcon } from "@/assets";
import {
  FastHomesBoxesElem,
  FastHomesBoxesElemMob,
  FastHomesLink,
} from "@/components";
import Image from "next/image";

const FastHomesPage = () => {
  return (
    <div className="relative z-[1] min-h-full w-full bg-fast-homes bg-no-repeat bg-center bg-cover before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-b before:from-[#000000e6] before:to-[#3c3c3cb3]">
      <div className="relative w-full max-w-8xl flex items-center mx-auto p-8 lg:pt-8 lg:pb-16 sm:px-4 lg:max-w-xl lg:flex-col">
        <FastHomesBoxesElem />
        <div className="w-full flex flex-col items-center">
          <div className="flex items-center justify-center gap-6 sm:gap-4 xs:gap-2">
            <Image
              src={fastHomesIcon}
              width={96}
              height={96}
              alt="Fast Homes Icon"
              className="w-24 h-auto xl:w-20 sm:w-14"
            />
            <div className="text-white uppercase">
              <h1 className="text-5xl xl:text-4.5xl lg:text-4xl sm:text-2xl tracking-semi-ultra-wide">
                <b>fast</b> homes
              </h1>
              <h2 className="text-lg xl:text-base lg:text-sm sm:text-xxs xs:text-xxxs opacity-50">
                DESIGNS . CONSTRUCTION . MATERIALS . PLOTS
              </h2>
            </div>
          </div>
          <hr className="hidden lg:block mt-4 w-full opacity-20" />
          <div className="w-full text-center hidden lg:block">
            <h2 className="text-white opacity-60 text-2xl sm:text-xl mt-4 tracking-wide">
              GREAT . FAST . ECONOMIC
            </h2>
            <p className="text-white opacity-50 font-light text-xs sm:text-xxs xs:text-xxs mt-2 flex gap-8 sm:gap-6 justify-center">
              <span>CRAFTED W/ CARE</span>
              <span>IN MOMENTS</span>
              <span>PRICES YOU&apos;LL LOVE</span>
            </p>
          </div>
          <hr className="hidden lg:block mt-4 w-full opacity-20" />
          <div className="text-lg xl:text-base sm:text-sm xs:text-xs text-white opacity-80 uppercase w-full max-w-sm sm:max-w-xs xs:w-5/6 mt-12 xl:mt-8">
            <h3 className="font-bold">select home by area</h3>
            <h3 className="w-fit ml-auto font-light">
              you aspire to make real
            </h3>
          </div>
          <hr className="w-full opacity-40 mt-4 lg:mt-1" />
          <div className="w-full flex items-center justify-center py-8 xl:py-6 lg:flex-col lg:gap-2 lg:py-4">
            <FastHomesLink
              text="upto 18 marlas"
              href="/fast-homes/design-selection?category=UPTO_18&step=0&screen=0"
            />
            <span className="hidden lg:block text-white text-sm uppercase opacity-60">
              4-8 marla homes
            </span>
            <hr className="w-1/12 self-center opacity-15 lg:w-1/3 lg:mb-2" />
            <FastHomesLink
              text="1 kanal & above"
              href="/fast-homes/design-selection?category=1_KANAL_ABOVE&step=0&screen=0"
            />
            <span className="hidden lg:block text-white text-sm uppercase opacity-60">
              1-2 kanal homes
            </span>
          </div>
          <hr className="w-full opacity-40" />
          <div className="w-full text-white text-lg xl:text-base font-light opacity-60 uppercase flex lg:hidden justify-evenly py-2">
            <span>4-8 marla homes</span>
            <span>1-2 kanal homes</span>
          </div>
          <hr className="w-4/5 opacity-15 lg:hidden" />
          <hr className="w-1/3 opacity-20 mt-12 lg:hidden" />
          <div className="w-full text-white text-sm sm:text-xs font-light opacity-60 uppercase text-center mt-2 lg:mt-6">
            MADE WITH HUNDREDS OF RUNS AND POSSIBILITIES
          </div>
          <hr className="hidden lg:block w-2/3 opacity-10 my-2" />
          <div className="block lg:hidden">
            <h2 className="text-white opacity-60 text-4xl xl:text-3xl mt-8 tracking-wide">
              GREAT . FAST . ECONOMIC
            </h2>
            <p className="text-white opacity-50 font-light text-sm mt-2 flex gap-12">
              <span>CRAFTED W/ CARE</span>
              <span>IN MOMENTS</span>
              <span>PRICES YOU&apos;LL LOVE</span>
            </p>
          </div>
        </div>
        <FastHomesBoxesElemMob />
        <FastHomesBoxesElem />
      </div>
    </div>
  );
};

export default FastHomesPage;
