"use client";
import { motion } from "framer-motion";
import { DesSelStep1Screen3ProjectsCarousel, ULinkButton2 } from "@/components";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import Image from "next/image";
import { jumpToIcon, minimizedViewIcon } from "@/assets";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useState } from "react";
import getScreeen3Projects from "@/Firebase/user-side/design-selection/step-1/getScreeen3Projects";

const projects = [
  {
    id: "8BA2iZqyVWFBm845CIeh",
    style: {
      id: "1710611303085",
      name: "BUNGALOW",
      budget: "MEDIUM",
    },
    description:
      "Our project aims to transform neglected urban spaces into vibrant, sustainable communities. With a focus on environmental stewardship and social cohesion, we propose a comprehensive architectural solution that integrates green spaces, renewable energy, and affordable housing.",
    productRates: ["1", "1", "1"],
    constructionRates: ["1", "11", "1"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2F8BA2iZqyVWFBm845CIeh%2Fimage?alt=media&token=ff2d898a-c9ce-4ac4-a46b-307f93a9889c",
    video:
      "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2F8BA2iZqyVWFBm845CIeh%2Fvideo?alt=media&token=c763a7c2-9215-4384-a67b-39cef67c3a74",
  },
  {
    id: "A5jYNwF9swEhx3LAUZic",
    style: {
      id: "1710611390963",
      name: "VILLA",
      budget: "HIGH",
    },
    description:
      "A beautful home to live in. The best one in the town for sure. This home has a beautiful garden and a swimming pool. The interior is designed by the best designers in the town.",
    productRates: ["1", "1", "1"],
    constructionRates: ["1", "1", "1"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2FA5jYNwF9swEhx3LAUZic%2Fimage?alt=media&token=773b578b-98c3-4ac4-bd12-582b660eab91",
    video:
      "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2FA5jYNwF9swEhx3LAUZic%2Fvideo?alt=media&token=028a71a5-3275-4a42-a269-5164ce736c84",
  },
  {
    id: "H6AoVBfYd0VgFjoB3iH2",
    style: {
      id: "1710611390963",
      name: "VILLA",
      budget: "HIGH",
    },
    description:
      "A beautful home to live in. The best one in the town for sure. This home has a beautiful garden and a swimming pool. The interior is designed by the best designers in the town.",
    productRates: ["jkh", "jk", "hk"],
    constructionRates: ["hj", "h", "jkh"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2FH6AoVBfYd0VgFjoB3iH2%2Fimage?alt=media&token=067b372b-6ae7-44f3-a345-4b9c3a589774",
    video:
      "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2FH6AoVBfYd0VgFjoB3iH2%2Fvideo?alt=media&token=d0bb6f73-734e-400c-bddb-d777f5fc1e5c",
  },
  {
    id: "OOIjoATlPTMXHpHD4bhk",
    style: {
      id: "1710611390963",
      name: "VILLA",
      budget: "HIGH",
    },
    description:
      "A beautful home to live in. The best one in the town for sure. This home has a beautiful garden and a swimming pool. The interior is designed by the best designers in the town.",
    productRates: ["l", "jk", "jlk"],
    constructionRates: ["12", "jkl", "lkj"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2FOOIjoATlPTMXHpHD4bhk%2Fimage?alt=media&token=1021b70c-c9ff-494c-974a-a1db61abd7b9",
    video:
      "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2FOOIjoATlPTMXHpHD4bhk%2Fvideo?alt=media&token=a791cefa-48c5-4146-8da2-64ae25ab11de",
  },
  {
    id: "wnKbxpwaJLl2i9ODAzof",
    style: {
      id: "1710611303085",
      name: "BUNGALOW",
      budget: "MEDIUM",
    },
    description:
      "Our project aims to transform neglected urban spaces into vibrant, sustainable communities. With a focus on environmental stewardship and social cohesion, we propose a comprehensive architectural solution that integrates green spaces, renewable.",
    productRates: ["jlk", "j", "lk"],
    constructionRates: ["jkl", "jkl", "jlk"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2FwnKbxpwaJLl2i9ODAzof%2Fimage?alt=media&token=6faead70-39ba-42a9-9b3d-8c0e0c77faeb",
    video:
      "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2FwnKbxpwaJLl2i9ODAzof%2Fvideo?alt=media&token=84400aa3-33e8-4fdf-a935-e8c83841fd09",
  },
];

const DesSelStep1Screen3 = () => {
  // const [projects, setProjects] = useState([]);
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const projectsFromDb = await getScreeen3Projects();
  //       setProjects(projectsFromDb);
  //     } catch (error) {
  //       console.error("Error getting the project data for preview: ", error);
  //     }
  //   };
  //   fetchProjects();
  // }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full min-h-page-user-inner max-h-page-user-inner max-w-8xl flex flex-col gap-8 lg:max-w-xl mx-auto px-4 py-8 sm:p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-10 lg:gap-2">
            <Link
              href={"/fast-homes"}
              className="bg-[#EFEFEF] p-4 xl:p-3 rounded-full shadow-btn">
              <FaChevronLeft size={24} className="w-6 h-auto sm:w-4" />
            </Link>
            <button className="border border-black rounded flex items-center gap-2 py-1 px-8 uppercase hover:shadow-btn transition-shadow duration-300 text-lg">
              <Image
                src={jumpToIcon}
                width={32}
                height={32}
                alt="Jump to icon"
                className="w-8 h-auto"
              />
              <span>jump to</span>
            </button>
          </div>
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-2 text-lg uppercase">
              <Image
                src={minimizedViewIcon}
                width={48}
                height={48}
                alt="Minimized view icon"
                className="w-14 h-auto"
              />
              <span>minimized view</span>
            </button>
            <div className="relative">
              <input
                type="text"
                className="text-lg border border-black rounded-full pl-4 pr-10 py-2 placeholder:text-black placeholder:opacity-60"
                placeholder="SEARCH"
              />
              <FaMagnifyingGlass
                width={20}
                className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-auto text-black opacity-50"
              />
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[#6A6A6A]">Learn More</span>
              <ULinkButton2
                text="all"
                href="/"
                className="ml-auto lg:text-sm text-white bg-[#323232] border border-[#323232] shadow-btn px-12 py-1 transition-colors duration-300 hover:bg-white hover:text-[#323232] hover:shadow-none"
              />
            </div>
          </div>
        </div>
        <DesSelStep1Screen3ProjectsCarousel>
          {projects.map(project => (
            <div
              key={project.id}
              className="h-full grid grid-cols-5 rounded-lg shadow-btn border border-black border-opacity-25 overflow-hidden">
              <div className="py-4 px-5 col-span-2 text-black/90">
                <h1 className="text-xl font-bold text-center">
                  {project.style.name}
                </h1>
                <h2 className="text-xs capitalize text-center">
                  {project.style.budget.toLowerCase()} Cost
                </h2>
                <p className="text-lg text-justify mt-1">{project.description}</p>
              </div>
              <div className="col-span-3">
                <Image
                  src={project.image}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                  alt="Project image"
                />
              </div>
            </div>
          ))}
        </DesSelStep1Screen3ProjectsCarousel>
      </motion.div>
    </>
  );
};

export default DesSelStep1Screen3;
