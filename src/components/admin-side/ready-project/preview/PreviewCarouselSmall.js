"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const PreviewCarouselSmall = ({ children, slidesCount }) => {
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
    slidesToShow: 4,
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
          {slidesCount > 1 ? (
            <Slider {...sliderSettings} ref={sliderRef}>
              {children}
            </Slider>
          ) : (
            <div className="w-1/4 mx-auto">{children}</div>
          )}
        </div>
        {slidesCount > 1 && (
          <>
            <button
              onClick={previousSlide}
              className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-2/3 bg-accent-2-base p-3 rounded-full">
              <FaChevronLeft className="text-white" size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-2/3 bg-accent-2-base p-3 rounded-full">
              <FaChevronRight className="text-white" size={24} />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default PreviewCarouselSmall;
