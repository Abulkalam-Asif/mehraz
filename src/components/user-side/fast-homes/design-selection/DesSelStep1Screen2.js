"use client";
import { motion } from "framer-motion";
import {
  DesSelStep1Screen2Header,
  DesSelStep1Screen2ProjectSlideMax,
  DesSelStep1Screen2ProjectSlideMin,
  DesSelStep1Screen2ProjectSlideMinMobile,
  DesSelStep1Screen2ProjectsCarouselMax,
  DesSelStep1Screen2ProjectsCarouselMin,
  DesSelStep1Screen2ProjectsCarouselMinMobile,
  UserScreenSpinner,
} from "@/components";
import { useEffect, useState } from "react";
import getStep1Screen2Projects from "@/Firebase/user-side/design-selection/step-1/getStep1Screen2Projects";
import useRPS from "@/hooks/useRPS";
import {
  getBookmarkedProjects,
  setBookmarkedProjects,
} from "@/utilities/user-side/design-selection/localStorageBookmarks";

const DesSelStep1Screen2 = ({ cities, styles }) => {
  const { router, pathname, searchParams } = useRPS();
  const categoryParam = searchParams.get("category");
  const cityParam = searchParams.get("city");
  const styleParam = searchParams.get("style");
  const styleCostParam = searchParams.get("styleCost");

  const [allProjects, setAllProjects] = useState(null);
  const [projectsToShow, setProjectsToShow] = useState([]);
  const [projectGroups, setProjectGroups] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsFromDb = await getStep1Screen2Projects(
          categoryParam,
          cityParam,
          styleParam,
          styleCostParam,
        );
        setAllProjects(projectsFromDb);
      } catch (error) {
        console.error("Error getting the project data for preview: ", error);
      }
    };
    fetchProjects();
  }, []);

  const view = searchParams.get("view") || "max";

  const changeView = newView => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("view", newView);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    if (!view) {
      changeView("max");
    }
  }, []);

  useEffect(() => {
    if (allProjects) {
      setProjectsToShow(allProjects);

      const groups = [];
      for (let i = 0; i < projectsToShow.length; i += 4) {
        groups.push(projectsToShow.slice(i, i + 4));
      }
      setProjectGroups(groups);
    }
  }, [allProjects]);

  const [maxViewCurrSlide, setMaxViewCurrSlide] = useState(1);

  const checkLocalStorageBookmarked = id => {
    const localStorageBookmarkedProjects = getBookmarkedProjects();
    return localStorageBookmarkedProjects.includes(id);
  };

  const bookmarkLocalStorageHandler = id => {
    const localStorageBookmarkedProjects = getBookmarkedProjects();
    const newBookmarkedProjects = localStorageBookmarkedProjects.includes(id)
      ? localStorageBookmarkedProjects.filter(
          bookmarkedId => bookmarkedId !== id,
        )
      : [...localStorageBookmarkedProjects, id];
    setBookmarkedProjects(newBookmarkedProjects);
  };

  const selectProjectHandler = id => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("step", 2);
    newParams.set("screen", 0);
    newParams.set("project", id);
    newParams.delete("view");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <>
      {!allProjects ? (
        <UserScreenSpinner />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full min-h-page-user-inner xl:min-h-page-user-inner-xl max-h-page-user-inner max-w-8xl flex flex-col gap-4 lg:gap-1 lg:max-w-xl mx-auto px-4 pt-8 pb-6 xl:py-4 sm:p-2">
          <DesSelStep1Screen2Header
            view={view}
            changeView={changeView}
            cities={cities}
            styles={styles}
          />
          {projectsToShow.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-gray-500">No projects found</p>
            </div>
          ) : view === "max" ? (
            <DesSelStep1Screen2ProjectsCarouselMax
              currentIndex={maxViewCurrSlide}
              setCurrentIndex={setMaxViewCurrSlide}>
              {projectsToShow.map(project => (
                <DesSelStep1Screen2ProjectSlideMax
                  key={project.id}
                  selectProjectHandler={() => {
                    selectProjectHandler(project.id);
                  }}
                  project={project}
                  isLocalStorageBookmarked={checkLocalStorageBookmarked(
                    project.id,
                  )}
                  bookmarkLocalStorageHandler={() =>
                    bookmarkLocalStorageHandler(project.id)
                  }
                />
              ))}
            </DesSelStep1Screen2ProjectsCarouselMax>
          ) : (
            view === "min" && (
              <>
                {/* 3 slides carousel for descktop */}
                <DesSelStep1Screen2ProjectsCarouselMin>
                  {projectsToShow.map((project, index) => (
                    <DesSelStep1Screen2ProjectSlideMin
                      key={project.id}
                      project={project}
                      selectProjectHandler={() => {
                        selectProjectHandler(project.id);
                      }}
                      seeMoreHandler={() => {
                        // index + 1 is because in the max view, the last slide is cloned to the 0th index and the first slide is cloned to the last index to produce a infinite carousel effect
                        setMaxViewCurrSlide(index + 1);
                        changeView("max");
                      }}
                      isLocalStorageBookmarked={checkLocalStorageBookmarked(
                        project.id,
                      )}
                      bookmarkLocalStorageHandler={() =>
                        bookmarkLocalStorageHandler(project.id)
                      }
                    />
                  ))}
                </DesSelStep1Screen2ProjectsCarouselMin>
                {/* 4 slides grid carousel for mobile and tablet */}
                <DesSelStep1Screen2ProjectsCarouselMinMobile>
                  {projectGroups?.map((group, groupIndex) => (
                    <div key={groupIndex}>
                      <div className="px-1 grid grid-cols-2 gap-2 mb-2">
                        {group.map((project, projectIndex) => (
                          <DesSelStep1Screen2ProjectSlideMinMobile
                            key={project.id}
                            project={project}
                            seeMoreHandler={() => {
                              setMaxViewCurrSlide(
                                groupIndex * 4 + projectIndex + 1,
                              );
                              changeView("max");
                            }}
                            isLocalStorageBookmarked={checkLocalStorageBookmarked(
                              project.id,
                            )}
                            bookmarkLocalStorageHandler={() =>
                              bookmarkLocalStorageHandler(project.id)
                            }
                            selectProjectHandler={() => {
                              selectProjectHandler(project.id);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </DesSelStep1Screen2ProjectsCarouselMinMobile>
              </>
            )
          )}
        </motion.div>
      )}
    </>
  );
};

export default DesSelStep1Screen2;
