"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { chevronLeftIcon, chevronRightIcon } from "@/assets";
import Image from "next/image";

const Carousel = ({ children, childrenCount }) => {
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
    slidesToShow: 1,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
      },
      {
        breakpoint: 768,
      },
      {
        breakpoint: 640,
      },
    ],
  };

  return (
    <>
      <div className="w-full relative">
        <div>
          <Slider {...sliderSettings} ref={sliderRef}>
            {children}
          </Slider>
        </div>
        {childrenCount > 2 && (
          <>
            <button
              onClick={previousSlide}
              className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-2/3 bg-accent-1-base p-4 rounded-full">
              <Image src={chevronLeftIcon} alt="chevron left" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-2/3 bg-accent-1-base p-4 rounded-full">
              <Image src={chevronRightIcon} alt="chevron right" />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Carousel;
