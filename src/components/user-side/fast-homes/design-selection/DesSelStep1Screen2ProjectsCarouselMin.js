"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const DesSelStep1Screen2ProjectsCarouselMin = ({ children }) => {
  const isSingleChild = children.length === 1;
  const sliderRef = useRef(null);

  const CustomPrevArrow = () => (
    <button className="custom-arrows prev-arrow hidden" />
  );

  const CustomNextArrow = () => (
    <button className="custom-arrows next-arrow hidden" />
  );

  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const sliderSettings = {
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    dots: false,
    infinite: !isSingleChild,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="block lg:hidden w-full relative">
        <div className="px-20">
          <Slider {...sliderSettings} ref={sliderRef}>
            {children}
          </Slider>
        </div>
        {!isSingleChild && (
          <>
            <button
              onClick={previousSlide}
              className="absolute w-auto h-full top-0 left-0 bottom-0 flex items-center justify-center focus:outline-none">
              <span className="bg-[#EFEFEF] bg-opacity-80 p-4 lg:p-3 rounded-full">
                <FaChevronLeft
                  className="text-black w-6 h-auto lg:w-5"
                  size={24}
                />
              </span>
            </button>
            <button
              onClick={nextSlide}
              className="absolute w-auto h-full top-0 right-0 bottom-0 z-[1] flex items-center justify-center focus:outline-none">
              <span className="bg-[#EFEFEF] bg-opacity-80 p-4 lg:p-3 rounded-full">
                <FaChevronRight
                  className="text-black w-6 h-auto lg:w-5"
                  size={24}
                />
              </span>
            </button>
          </>
        )}
      </motion.div>
    </>
  );
};

export default DesSelStep1Screen2ProjectsCarouselMin;
