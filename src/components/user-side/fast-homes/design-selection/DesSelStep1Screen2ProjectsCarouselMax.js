"use client";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const DesSelStep1Screen2ProjectsCarouselMax = ({
  children,
  currentIndex,
  setCurrentIndex,
}) => {
  const isSingleChild = children.length === 1;
  const [items, setItems] = useState([...children]);

  useEffect(() => {
    // Clone the first and last items to make the carousel infinite
    if (!isSingleChild) {
      const clonedItems = [
        children[children.length - 1],
        ...children,
        children[0],
      ];
      setItems(clonedItems);
    } else {
      setItems(children);
    }
  }, [children]);

  const previousSlide = () => {
    setCurrentIndex(prevIndex => prevIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  useEffect(() => {
    if (currentIndex === 0) {
      setCurrentIndex(children.length);
    } else if (currentIndex === items.length - 1) {
      setCurrentIndex(1);
    }
  }, [currentIndex, items.length, children.length]);

  const slideWidth = 80;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`h-full flex-1 w-full relative overflow-hidden`}>
      <div className="relative flex justify-center h-full">
        <div
          className="flex transition-transform duration-500 h-full"
          style={{
            transform: `${
              isSingleChild
                ? `translateX(0)`
                : `translateX(-${
                    currentIndex * slideWidth - (100 - slideWidth) / 2
                  }%)`
            }`,
            width: `${items.length * slideWidth}%`,
            minWidth: `100%`,
            maxWidth: `${items.length * slideWidth}%`,
          }}>
          {items.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-full pb-2"
              style={{
                width: `${slideWidth}%`,
                maxWidth: `${slideWidth}%`,
                margin: `${isSingleChild ? "auto" : ""}`,
                transform: `${
                  isSingleChild
                    ? ""
                    : `scale(${index === currentIndex ? 1 : 0.8}) translateX(${
                        index < currentIndex
                          ? 10
                          : index > currentIndex
                          ? -10
                          : 0
                      }%)`
                }`,
                transition: "transform 0.5s",
              }}>
              {child}
            </div>
          ))}
        </div>
      </div>
      {!isSingleChild && (
        <>
          <button
            onClick={previousSlide}
            className="absolute w-[8%] lg:w-auto h-full top-0 left-0 bottom-0 bg-gradient-to-r from-white to-white/0 z-[1] flex items-center justify-center focus:outline-none">
            <span className="bg-[#EFEFEF] bg-opacity-80 p-4 lg:p-3 rounded-full">
              <FaChevronLeft
                className="text-black w-6 h-auto lg:w-5"
                size={24}
              />
            </span>
          </button>
          <button
            onClick={nextSlide}
            className="absolute w-[8%] lg:w-auto h-full top-0 right-0 bottom-0 bg-gradient-to-r from-white/0 to-white z-[1] flex items-center justify-center focus:outline-none">
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
  );
};

export default DesSelStep1Screen2ProjectsCarouselMax;
