"use client";
import useRPS from "@/hooks/useRPS";
import Link from "next/link";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import DesignOptionsRadio from "./DesignOptionsRadio";
import { motion } from "framer-motion";
import UserScreenSpinner from "../UserScreenSpinner";
import Image from "next/image";
import { circleCheckIcon, tour360icon } from "@/assets";
import DesignCarouselSmall from "./DesignCarouselSmall";
import UButton from "../UButton";
import DesignCarouselMain from "./DesignCarouselMain";

const Modal = lazy(() => import("../../Modal"));
const HomeProgramModal = lazy(() => import("./HomeProgramModal"));

// temp data
const defaultDesign = {
  id: "hajfkajlj214141",
  title: "Design Title",
  area: {
    id: "4jB5BRiha5F45jcGzTEE",
    area: 10,
    category: "UPTO_18",
    unit: "MARLA",
  },
  floors: {
    id: "GywcLbBL9cjTxRq6GgX9",
    name: "FIRST",
  },
  familyUnit: {
    id: "GywcLbBL9cjTxRq6GgX9",
    name: "ONE UNIT",
  },
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  descriptionOp1: "moon",
  descriptionOp2: "moon",
  style: {
    name: "MODERN",
    budget: "LOW",
  },
  images: [
    "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  imagesOp1: [
    "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  imagesOp2: [
    "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  designCost: 10000,
  constructionCost: 200000000,
  op1Name: "first",
  op2Name: "second",
  materials: [
    {
      image:
        "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "marble",
      vendor: "vendor",
      price: "1500 PKR/CFT",
    },
    {
      image:
        "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "marble",
      vendor: "vendor",
      price: "1500 PKR/CFT",
    },
    {
      image:
        "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "marble",
      vendor: "vendor",
      price: "1500 PKR/CFT",
    },
    {
      image:
        "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "marble",
      vendor: "vendor",
      price: "1500 PKR/CFT",
    },
  ],
  programs: [
    {
      category: "bedroom",
      quantity: 3,
      subCategories: [
        {
          space: "main bedroom",
          size: "12 by 6 feet",
        },
        {
          space: "second bedroom",
          size: "10 by 6 feet",
        },
        {
          space: "third bedroom",
          size: "10 by 5 feet",
        },
      ],
    },
    {
      category: "bathroom",
      quantity: 3,
      subCategories: [
        {
          space: "main bathroom",
          size: "6 by 6 feet",
        },
        {
          space: "second bathroom",
          size: "6 by 6 feet",
        },
        {
          space: "third bathroom",
          size: "6 by 6 feet",
        },
      ],
    },
    {
      category: "kitchen",
      quantity: 1,
      subCategories: [
        {
          space: "kitchen",
          size: "12 by 6 feet",
        },
      ],
    },
  ],
};

const DesignsClientPage = () => {
  const { router, pathname, searchParams } = useRPS();
  const { id } = searchParams;
  const [design, setDesign] = useState(null);
  const fetchDesignData = async () => {
    // TODO: Fetch design data from server
    setDesign(defaultDesign);
  };

  useEffect(() => {
    fetchDesignData();
  }, []);

  const [selectedOption, setSelectedOption] = useState(0);
  const selectOptionHandler = option => {
    setSelectedOption(option);
  };

  const [isHomeProgramModalOpen, setIsHomeProgramModalOpen] = useState(false);
  const toggleHomeProgramModal = () => {
    setIsHomeProgramModalOpen(prev => !prev);
  };

  return (
    design && (
      <Suspense fallback={UserScreenSpinner}>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-8 h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)]">
          <div className="max-w-8xl w-auto h-full min-h-page-user-inner max-h-page-user-inner mx-auto px-4 pt-8 pb-6 grid grid-cols-2 gap-16 items-center">
            <div className="h-full flex flex-col">
              <div className="w-full flex items-center gap-4">
                <Link
                  href={"/"}
                  className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn">
                  <FaChevronLeft size={24} className="w-6 h-auto sm:w-4" />
                </Link>
                <div className="w-full flex flex-col items-center">
                  <h1 className="text-2xl w-full self-start font-bold uppercase text-[#2f2f2f] border-b border-b-black/20">
                    {design.title}
                  </h1>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[#2f2f2f]/70 text-sm uppercase">
                      options
                    </span>
                    <DesignOptionsRadio
                      options={[design.op1Name, design.op2Name]}
                      selectedOption={selectedOption}
                      selectOptionHandler={selectOptionHandler}
                    />
                  </div>
                </div>
              </div>
              <div className="ml-8 h-full flex flex-col gap-2">
                <p className="mt-4 flex-1">{design.description}</p>
                <div className="flex items-center justify-between text-lg">
                  <Link
                    href={"/"}
                    className="flex items-center uppercase gap-1 bg-[#FFF3E4] text-[#2f2f2f] rounded-md px-4 py-1 shadow-btn">
                    <span>360 tour</span>
                    <Image src={tour360icon} width={28} height={28} />
                  </Link>
                  <button
                    onClick={toggleHomeProgramModal}
                    className="uppercase bg-[#FFF3E4] text-[#2f2f2f] rounded-md px-4 py-1 shadow-btn">
                    home program
                  </button>
                </div>
                <DesignCarouselSmall slidesCount={design.materials.length}>
                  {design.materials.map((material, index) => (
                    <div key={index} className="w-full p-2 pb-4">
                      <div className="w-full h-28 rounded-md overflow-hidden sm:h-20">
                        <Image
                          src={material.image}
                          width={500}
                          height={500}
                          alt={material.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-[#EFEFEF] text-sm text-[#2f2f2f] uppercase">
                        <div className="p-2 pb-0">
                          <h4 className="font-bold">{material.name}</h4>
                          <h4>{material.vendor}</h4>
                        </div>
                        <h5 className="border bg-white border-[#2f2f2f] rounded-full px-1 py-0.5 text-center text-[#2f2f2f] text-xs translate-y-1/2">
                          {material.price}
                        </h5>
                      </div>
                    </div>
                  ))}
                </DesignCarouselSmall>
                <UButton
                  // onClick={selectDesignHandler}
                  className="w-full flex flex-col items-center justify-center text-[#2F2F2F] py-0.5 px-4"
                  color="solid-gold"
                  text={
                    <>
                      <span className="flex items-center justify-center mt-2 gap-1 text-lg xl:text-xs font-bold">
                        <Image
                          src={circleCheckIcon}
                          width={24}
                          height={22}
                          className="w-6 h-auto mb-1"
                          alt="circle check"
                        />
                        <span>get designed</span>
                      </span>
                      <span className="uppercase text-xs italic">
                        purchase service, pkr 10,000
                      </span>
                    </>
                  }
                />
              </div>
            </div>
            <div className="h-full">
              <DesignCarouselMain slidesCount={design.images.length}>
                {design.images.map((image, index) => (
                  <div
                    key={index}
                    className="h-[60vh] min-h-[400px] max-h-[550px] lg:h-[40vh] sm:h-[30vh] xs:h-[25vh] rounded-xl overflow-hidden">
                    <Image
                      src={image}
                      width={500}
                      height={500}
                      alt={design.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </DesignCarouselMain>
              <DesignCarouselSmall
                className="lg:mt-4"
                slidesCount={
                  selectedOption === 0
                    ? design.imagesOp1.length
                    : design.imagesOp2.length
                }>
                {(selectedOption === 0
                  ? design.imagesOp1
                  : design.imagesOp2
                )?.map((image, index) => {
                  return (
                    <div key={index} className="w-full p-2">
                      <div className="w-full h-[20vh] min-h-[150px] max-h-[200px] rounded-md overflow-hidden sm:h-20">
                        <Image
                          src={image}
                          width={500}
                          height={500}
                          alt="image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  );
                })}
              </DesignCarouselSmall>
            </div>
          </div>
        </motion.section>
        {isHomeProgramModalOpen && (
          <Suspense fallback={UserScreenSpinner}>
            <Modal
              isModalOpen={isHomeProgramModalOpen}
              toggleModal={toggleHomeProgramModal}>
              <HomeProgramModal programs={design.programs} />
            </Modal>
          </Suspense>
        )}
      </Suspense>
    )
  );
};

export default DesignsClientPage;
