"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const DesignCarouselSmall = ({ children, className = "", slidesCount }) => {
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
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <>
      <div className={`w-full relative ${className}`}>
        <div>
          {slidesCount > 3 ? (
            <Slider {...sliderSettings} ref={sliderRef}>
              {children}
            </Slider>
          ) : (
            <div className="flex items-center justify-center">
              {children}
            </div>
          )}
        </div>
        {slidesCount > 3 && (
          <>
            <button
              onClick={previousSlide}
              className="absolute top-1/2 -translate-y-1/2 left-2 bg-[#EFEFEF]/60 p-3 rounded-full hover:bg-[#EFEFEF]/90">
              <FaChevronLeft
                className="text-[#2F2F2F]"
                stroke="#2F2F2F"
                strokeWidth={40}
                size={20}
              />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 -translate-y-1/2 right-2 bg-[#EFEFEF]/60 p-3 rounded-full hover:bg-[#EFEFEF]/90">
              <FaChevronRight
                className="text-[#2F2F2F]"
                size={20}
                stroke="#2F2F2F"
                strokeWidth={40}
              />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default DesignCarouselSmall;
