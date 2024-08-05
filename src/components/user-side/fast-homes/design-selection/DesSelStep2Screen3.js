"use client";
import { motion } from "framer-motion";
import {
  DesSelStep2Screen3Header,
  DesSelStep2Screen3DesignSlideMax,
  DesSelStep2Screen3DesignSlideMin,
  DesSelStep2Screen3DesignSlideMinMobile,
  UserScreenSpinner,
} from "@/components";
import { lazy, useEffect, useState, Suspense } from "react";
import useRPS from "@/hooks/useRPS";
import {
  getBookmarkedDesigns,
  setBookmarkedDesigns,
} from "@/utilities/user-side/design-selection/localStorageBookmarks";

const DesSelStep1Screen2ProjectsCarouselMax = lazy(() =>
  import("./DesSelStep1Screen2ProjectsCarouselMax"),
);
const DesSelStep1Screen2ProjectsCarouselMin = lazy(() =>
  import("./DesSelStep1Screen2ProjectsCarouselMin"),
);
const DesSelStep1Screen2ProjectsCarouselMinMobile = lazy(() =>
  import("./DesSelStep1Screen2ProjectsCarouselMinMobile"),
);

const allDesigns = [
  {
    id: "hajfkajlj214141",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris....",
    descriptionOp1: "moon",
    descriptionOp2: "moon",
    style: {
      name: "MODERN",
      budget: "LOW",
    },
    image:
      "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    designCost: 10000,
    constructionCost: 200000000,
  },
  {
    id: "hajfkajlj214142",
    area: {
      id: "4jB5BRiha5F45jcGzTEE",
      area: 15,
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris jaej",
    descriptionOp1:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris",
    descriptionOp2:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis",
    style: {
      name: "MODERN",
      budget: "LOW",
    },
    image:
      "https://images.unsplash.com/photo-1705179116249-a659af885205?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    designCost: 12000,
    constructionCost: 200000000,
  },
];

const DesSelStep2Screen3 = ({ areas, floors, familyUnits }) => {
  const { router, pathname, searchParams } = useRPS();
  const areaParam = searchParams.get("area");
  const floorParam = searchParams.get("floor");
  const familyUnitParam = searchParams.get("familyUnit");
  const requirementsParam = searchParams.get("requirements");

  // const [allDesigns, setAllDesigns] = useState(null);
  const [designsToShow, setDesignsToShow] = useState([]);
  const [designGroups, setDesignGroups] = useState([]);

  const designView = searchParams.get("designView") || "max";

  const changeView = newView => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("designView", newView);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    if (!designView) {
      changeView("max");
    }
  }, []);

  useEffect(() => {
    if (allDesigns) {
      setDesignsToShow(allDesigns);

      const groups = [];
      for (let i = 0; i < designsToShow.length; i += 4) {
        groups.push(designsToShow.slice(i, i + 4));
      }
      setDesignGroups(groups);
    }
  }, [allDesigns, designsToShow]);

  const [maxViewCurrSlide, setMaxViewCurrSlide] = useState(1);

  const checkLocalStorageBookmarked = id => {
    const localStorageBookmarkedDesigns = getBookmarkedDesigns();
    return localStorageBookmarkedDesigns.includes(id);
  };

  const bookmarkLocalStorageHandler = id => {
    const localStorageBookmarkedDesigns = getBookmarkedDesigns();
    const newBookmarkedDesigns = localStorageBookmarkedDesigns.includes(id)
      ? localStorageBookmarkedDesigns.filter(
          bookmarkedId => bookmarkedId !== id,
        )
      : [...localStorageBookmarkedDesigns, id];
    setBookmarkedDesigns(newBookmarkedDesigns);
  };

  const selectDesignHandler = id => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("step", 2);
    newParams.set("screen", 0);
    newParams.set("design", id);
    newParams.delete("designView");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <>
      {!allDesigns ? (
        <UserScreenSpinner />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full min-h-page-user-inner xl:min-h-page-user-inner-xl max-h-page-user-inner max-w-8xl flex flex-col gap-2 lg:gap-1 lg:max-w-xl mx-auto px-4 pt-8 pb-6 xl:py-4 sm:p-2">
          <DesSelStep2Screen3Header
            designView={designView}
            changeView={changeView}
            areas={areas}
            floors={floors}
            familyUnits={familyUnits}
          />
          {designsToShow.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-gray-500">No designs found</p>
            </div>
          ) : designView === "max" ? (
            <Suspense fallback={<UserScreenSpinner />}>
              <DesSelStep1Screen2ProjectsCarouselMax
                currentIndex={maxViewCurrSlide}
                setCurrentIndex={setMaxViewCurrSlide}>
                {designsToShow.map(design => (
                  <DesSelStep2Screen3DesignSlideMax
                    key={design.id}
                    selectDesignHandler={() => {
                      selectDesignHandler(design.id);
                    }}
                    design={design}
                    isLocalStorageBookmarked={checkLocalStorageBookmarked(
                      design.id,
                    )}
                    bookmarkLocalStorageHandler={() =>
                      bookmarkLocalStorageHandler(design.id)
                    }
                  />
                ))}
              </DesSelStep1Screen2ProjectsCarouselMax>
            </Suspense>
          ) : (
            designView === "min" && (
              <>
                {/* 3 slides carousel for descktop */}
                <Suspense fallback={<UserScreenSpinner />}>
                  <DesSelStep1Screen2ProjectsCarouselMin>
                    {designsToShow.map((design, index) => (
                      <DesSelStep2Screen3DesignSlideMin
                        key={design.id}
                        design={design}
                        selectDesignHandler={() => {
                          selectDesignHandler(design.id);
                        }}
                        seeMoreHandler={() => {
                          // index + 1 is because in the max designView, the last slide is cloned to the 0th index and the first slide is cloned to the last index to produce a infinite carousel effect
                          setMaxViewCurrSlide(index + 1);
                          changeView("max");
                        }}
                        isLocalStorageBookmarked={checkLocalStorageBookmarked(
                          design.id,
                        )}
                        bookmarkLocalStorageHandler={() =>
                          bookmarkLocalStorageHandler(design.id)
                        }
                      />
                    ))}
                  </DesSelStep1Screen2ProjectsCarouselMin>
                </Suspense>
                {/* 4 slides grid carousel for mobile and tablet */}
                <Suspense fallback={<UserScreenSpinner />}>
                  <DesSelStep1Screen2ProjectsCarouselMinMobile>
                    {designGroups?.map((group, groupIndex) => (
                      <div key={groupIndex}>
                        <div className="px-1 grid grid-cols-2 gap-2 mb-2">
                          {group?.map((design, designIndex) => (
                            <DesSelStep2Screen3DesignSlideMinMobile
                              key={design.id}
                              design={design}
                              seeMoreHandler={() => {
                                setMaxViewCurrSlide(
                                  groupIndex * 4 + designIndex + 1,
                                );
                                changeView("max");
                              }}
                              isLocalStorageBookmarked={checkLocalStorageBookmarked(
                                design.id,
                              )}
                              bookmarkLocalStorageHandler={() =>
                                bookmarkLocalStorageHandler(design.id)
                              }
                              selectDesignHandler={() => {
                                selectDesignHandler(design.id);
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </DesSelStep1Screen2ProjectsCarouselMinMobile>
                </Suspense>
              </>
            )
          )}
        </motion.div>
      )}
    </>
  );
};

export default DesSelStep2Screen3;
