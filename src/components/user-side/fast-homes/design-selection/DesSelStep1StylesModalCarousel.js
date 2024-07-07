"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DesSelStep1StylesModalCarousel = ({ children, className }) => {
  const sliderSettings = {
    arrows: false,
    dots: true,
    dotsClass: "desSelScreen2StylesModalCarousalDotsContainer",
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };

  return (
    <>
      <div className={`w-full relative ${className}`}>
        <div>
          <Slider {...sliderSettings}>{children}</Slider>
        </div>
      </div>
    </>
  );
};

export default DesSelStep1StylesModalCarousel;
