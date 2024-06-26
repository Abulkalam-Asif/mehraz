"use client";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const DesSelStep1Screen3ProjectsCarousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState([...children]);

  useEffect(() => {
    const clonedItems = [
      children[children.length - 1],
      ...children,
      children[0],
    ];
    setItems(clonedItems);
    setCurrentIndex(1);
  }, [children]);

  const previousSlide = () => {
    setCurrentIndex(prevIndex => prevIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => setCurrentIndex(children.length), 300);
    } else if (currentIndex === items.length - 1) {
      setTimeout(() => setCurrentIndex(1), 300);
    }
  }, [currentIndex, items.length, children.length]);

  const slideWidth = 70;

  return (
    <div
      className={`desSelStep1Screen3ProjectsCarousel flex-1 w-full relative overflow-hidden`}>
      <div className="relative flex justify-center h-full">
        <div
          className="flex transition-transform duration-500 h-full"
          style={{
            transform: `translateX(-${
              currentIndex * slideWidth - (100 - slideWidth) / 2
            }%)`,
            width: `${items.length * slideWidth}%`,
          }}>
          {items.map((child, index) => (
            <div
              key={index}
              className="slide flex-shrink-0 h-full pb-2"
              style={{
                width: `${slideWidth}%`,
                transform: `scale(${
                  index === currentIndex ? 1 : 0.8
                }) translateX(${
                  index < currentIndex ? 10 : index > currentIndex ? -10 : 0
                }%)`,
                transition: "transform 0.5s",
              }}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={previousSlide}
        className="absolute w-[13%] h-full top-0 left-0 bottom-0 bg-gradient-to-r from-white to-white/0 z-[1] flex items-center justify-center focus:outline-none">
        <span className="bg-[#EFEFEF] bg-opacity-80 p-4 rounded-full">
          <FaChevronLeft className="text-black" size={24} />
        </span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute w-[13%] h-full top-0 right-0 bottom-0 bg-gradient-to-r from-white/0 to-white z-[1] flex items-center justify-center focus:outline-none">
        <span className="bg-[#EFEFEF] bg-opacity-80 p-4 rounded-full">
          <FaChevronRight className="text-black" size={24} />
        </span>
      </button>
    </div>
  );
};

export default DesSelStep1Screen3ProjectsCarousel;
