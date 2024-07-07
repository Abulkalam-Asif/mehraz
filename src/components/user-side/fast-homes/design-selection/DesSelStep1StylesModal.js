"use client";
import { AiOutlineClose } from "react-icons/ai";
import DesSelStep1StylesModalCarousel from "./DesSelStep1StylesModalCarousel";
import { useEffect, useState } from "react";
import Image from "next/image";

const DesSelStep1StylesModal = ({
  isModalOpen = false,
  toggleModal = () => {},
  styles,
  styleCost,
  step1Screen2FormDataInputHandler,
}) => {
  const [stylesToShow, setStylesToShow] = useState([]);
  const [styleArraysToShow, setStyleArraysToShow] = useState([]);
  useEffect(() => {
    setStylesToShow(
      styles?.filter(style => styleCost === "" || style.budget === styleCost),
    );
  }, [styles, styleCost]);

  useEffect(() => {
    setStyleArraysToShow(
      stylesToShow?.reduce((acc, style, index) => {
        const arrayIndex = Math.floor(index / 4);
        acc[arrayIndex] = [...(acc[arrayIndex] || []), style];
        return acc;
      }, []),
    );
  }, [stylesToShow]);

  return (
    <>
      <div
        onClick={toggleModal}
        className={`${
          isModalOpen
            ? "fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 z-[5]"
            : "hidden"
        }`}></div>
      {
        <div
          className={`fixed z-[6] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-8xl lg:max-w-xl bg-white rounded-xl overflow-hidden`}>
          <div className="bg-gradient-to-r from-accent-dark-blue to-accent-sea-green pt-12 lg:pt-8 px-10 lg:px-4 pb-6 lg:pb-2">
            <div className="w-full relative flex flex-col items-center gap-4 lg:gap-2 text-center mb-6">
              <h3 className="text-white font-bold text-3.5xl lg:text-2xl sm:text-xl">
                SELECT STYLE
              </h3>
              <h4 className="text-[#FFF3E4] opacity-70 text-lg lg:text-sm sm:text-xs xs:text-xxs text-balance max-w-[40ch]">
                {styleCost === "" ? (
                  <>
                    ITS BETTER TO SELECT <b>COST</b> FIRST, SO WE SHOW THE BEST
                    OPTIONS ACCORDING TO YOUR NEED
                  </>
                ) : (
                  styleCost
                )}
              </h4>
              <button
                onClick={toggleModal}
                className="absolute top-0 right-2 lg:right-0 p-2 lg:p-0 rounded-full ">
                <AiOutlineClose
                  size={40}
                  className="text-white w-10 lg:w-8 h-auto"
                />
              </button>
            </div>
            {/* For screens over 1024px */}
            <DesSelStep1StylesModalCarousel className={"lg:hidden"}>
              {stylesToShow?.map(({ id, name, budget, image }) => (
                <button
                  key={id}
                  className="px-3"
                  onClick={() => {
                    step1Screen2FormDataInputHandler("style", id);
                    toggleModal();
                  }}>
                  <div className="min-h-[40vh] h-52">
                    <Image
                      src={image}
                      alt={name}
                      width={300}
                      height={300}
                      priority={true}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-white text-center mt-6">
                    <h3 className="text-lg uppercase">{name}</h3>
                    {styleCost === "" && (
                      <h4 className="text-sm lowercase">{budget}-cost</h4>
                    )}
                  </div>
                </button>
              ))}
            </DesSelStep1StylesModalCarousel>
            {/* For <= 1024px */}
            <DesSelStep1StylesModalCarousel className={"hidden lg:block"}>
              {styleArraysToShow.map((styleArray, index) => (
                <div key={index}>
                  <div className="grid grid-cols-2">
                    {styleArray.map(({ id, name, budget, image }) => (
                      <button
                        key={id}
                        className="p-2"
                        onClick={() => {
                          step1Screen2FormDataInputHandler("style", id);
                          toggleModal();
                        }}>
                        <div className="max-h-[25vh] h-32">
                          <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-white text-center mt-2">
                          <h3 className="text-lg sm:text-base uppercase">
                            {name}
                          </h3>
                          {styleCost === "" && (
                            <h4 className="text-sm sm:text-xs lowercase">
                              {budget}-cost
                            </h4>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </DesSelStep1StylesModalCarousel>
          </div>
        </div>
      }
    </>
  );
};

export default DesSelStep1StylesModal;
