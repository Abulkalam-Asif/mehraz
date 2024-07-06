"use client";
import { motion } from "framer-motion";
import {
  DesSelStep1Screen3Header,
  DesSelStep1Screen3ProjectSlideMax,
  DesSelStep1Screen3ProjectSlideMin,
  DesSelStep1Screen3ProjectSlideMinMobile,
  DesSelStep1Screen3ProjectsCarouselMax,
  DesSelStep1Screen3ProjectsCarouselMin,
  DesSelStep1Screen3ProjectsCarouselMinMobile,
  ULinkButton2,
} from "@/components";
import { useEffect, useMemo, useState } from "react";
import getScreeen3Projects from "@/Firebase/user-side/design-selection/step-1/getScreeen3Projects";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const allProjects = [
  {
    id: "A5jYNwF9swEhx3LAUZic",
    style: {
      id: "1710611390963",
      name: "VILLA",
      budget: "HIGH",
    },
    description:
      "Our project aims to transform neglected urban spaces into vibrant, sustainable communities. With a focus on environmental stewardship and social.",
    productRates: ["RS 100 / sq ft", "RS 12 / sq meter", "RS 300 / sq yard"],
    constructionRates: [
      "RS 2000 / sq ft",
      "RS 100 / sq meter",
      "RS 500 / sq yard",
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2FA5jYNwF9swEhx3LAUZic%2Fimage?alt=media&token=773b578b-98c3-4ac4-bd12-582b660eab91",
    video:
      "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2FA5jYNwF9swEhx3LAUZic%2Fvideo?alt=media&token=028a71a5-3275-4a42-a269-5164ce736c84",
  },
  {
    id: "8BA2iZqyVWFBm845CIeh",
    style: {
      id: "1710611303085",
      name: "BUNGALOW",
      budget: "MEDIUM",
    },
    description:
      "Our project aims to transform neglected urban spaces into vibrant, sustainable communities. With a focus on environmental stewardship and social.",
    productRates: ["RS 100 / sq ft", "RS 12 / sq meter", "RS 300 / sq yard"],
    constructionRates: [
      "RS 2000 / sq ft",
      "RS 100 / sq meter",
      "RS 500 / sq yard",
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2F8BA2iZqyVWFBm845CIeh%2Fimage?alt=media&token=ff2d898a-c9ce-4ac4-a46b-307f93a9889c",
    video:
      "https://firebasestorage.googleapis.com/v0/b/mehraz-e8261.appspot.com/o/READY_PROJECTS%2F8BA2iZqyVWFBm845CIeh%2Fvideo?alt=media&token=c763a7c2-9215-4384-a67b-39cef67c3a74",
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [view, setView] = useState("min");
  useEffect(() => {
    const paramsView = searchParams.get("view");
    if (paramsView) {
      setView(paramsView);
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("view", "min");
      router.push(`${pathname}?${newParams.toString()}`);
      setView("min");
    }
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("view", view);
    router.push(`${pathname}?${newParams.toString()}`);
  }, [view]);

  const [searchString, setSearchString] = useState("");

  const [projects, setProjects] = useState(allProjects);
  const [projectGroups, setProjectGroups] = useState([]);

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

  useEffect(() => {
    const groups = [];
    for (let i = 0; i < projects.length; i += 4) {
      groups.push(projects.slice(i, i + 4));
    }
    setProjectGroups(groups);
  }, [projects]);

  useEffect(() => {
    setProjects(
      allProjects.filter(project => {
        const search = searchString.toLowerCase();
        return (
          searchString === "" ||
          project.description.toLowerCase().includes(search) ||
          project.style.name.toLowerCase().includes(search)
        );
      }),
    );
  }, [searchString]);

  const [maxViewCurrSlide, setMaxViewCurrSlide] = useState(1);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full min-h-page-user-inner xl:min-h-page-user-inner-xl max-h-page-user-inner max-w-8xl flex flex-col gap-4 lg:gap-1 lg:max-w-xl mx-auto px-4 pt-8 pb-6 xl:py-4 sm:p-2">
        <DesSelStep1Screen3Header
          searchString={searchString}
          setSearchString={setSearchString}
          view={view}
          setView={setView}
        />
        {view === "max" ? (
          <DesSelStep1Screen3ProjectsCarouselMax
            currentIndex={maxViewCurrSlide}
            setCurrentIndex={setMaxViewCurrSlide}>
            {projects.map(project => (
              <DesSelStep1Screen3ProjectSlideMax
                key={project.id}
                project={project}
              />
            ))}
          </DesSelStep1Screen3ProjectsCarouselMax>
        ) : (
          view === "min" && (
            <>
              {/* 3 slides carousel for descktop */}
              <DesSelStep1Screen3ProjectsCarouselMin>
                {projects.map((project, index) => (
                  <DesSelStep1Screen3ProjectSlideMin
                    key={project.id}
                    project={project}
                    seeMoreHandler={() => {
                      // index + 1 is because in the max view, the last slide is cloned to the 0th index and the first slide is cloned to the last index to produce a infinite carousel effect
                      setMaxViewCurrSlide(index + 1);
                      setView("max");
                    }}
                  />
                ))}
              </DesSelStep1Screen3ProjectsCarouselMin>
              <DesSelStep1Screen3ProjectsCarouselMinMobile>
                {projectGroups.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    <div className="px-1 grid grid-cols-2 gap-2 mb-2">
                      {group.map((project, projectIndex) => (
                        <DesSelStep1Screen3ProjectSlideMinMobile
                          key={project.id}
                          project={project}
                          seeMoreHandler={() => {
                            setMaxViewCurrSlide(
                              groupIndex * 4 + projectIndex + 1,
                            );
                            setView("max");
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </DesSelStep1Screen3ProjectsCarouselMinMobile>
              {/* 4 slides grid carousel for mobile and tablet */}
            </>
          )
        )}
      </motion.div>
    </>
  );
};

export default DesSelStep1Screen3;
