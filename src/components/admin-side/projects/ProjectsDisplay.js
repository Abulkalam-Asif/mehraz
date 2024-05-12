"use client";
import { stringEllipsis } from "@/utilities/admin-panel/stringEllipsis";
import {
  Carousel,
  Table,
  Spinner,
  ProjectDisplayBoxMob,
  Td,
  Th,
  ProjectActions,
} from "@/components";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";
import createProjectGroupsArr from "@/utilities/admin-panel/projects/createProjectGroupsArr";
import { deleteIcon, editIcon } from "@/assets";
import Image from "next/image";
import Link from "next/link";

const ProjectsDisplay = ({ freeProjects, readyProjects }) => {
  const projects = [...freeProjects, ...readyProjects];
  const projectsCount = projects?.length;

  const [projectsGroupsArr, setProjectsGroupsArr] = useState(null);
  // Converting the projects array into array of arrays of 2
  useEffect(() => {
    if (projects) {
      const projectsGroupsArr = createProjectGroupsArr(projects);
      setProjectsGroupsArr(projectsGroupsArr);
    }
  }, []);

  const deleteProjectHandler = e => {
    const projectId = e.currentTarget.dataset.projectId;
    // TODO (Will be done later) (backend): delete project from database
  };
  return (
    <>
      {projects ? (
        projectsCount === 0 ? (
          <div className="flex items-center justify-center text-lg font-medium">
            <p className="mt-2">Not projects found!</p>
          </div>
        ) : (
          <>
            <Table className="max-w-8xl p-4 lg:hidden">
              <thead className="whitespace-nowrap">
                <tr>
                  <Th position="beginning" className="w-2/12 py-3 px-5">
                    project title
                  </Th>
                  <Th className="w-2/3 py-3 px-5">description</Th>
                  <Th className="w-1/12 py-3 px-5">date created</Th>
                  <Th className="w-1/12 py-3 px-5">completed</Th>
                  <Th position="end" className="w-1/12 py-3 px-5">
                    action
                  </Th>
                </tr>
              </thead>
              <tbody className="text-base">
                {projects?.map(
                  (
                    {
                      id,
                      title,
                      description,
                      isCompleted,
                      dateCreated,
                      uploadedScreensCount,
                      type,
                    },
                    index,
                  ) => (
                    <tr key={index}>
                      <Td
                        position="beginning"
                        isLastRow={index === projectsCount - 1}
                        className="text-left py-3 px-5">
                        {title}
                      </Td>
                      <Td
                        isLastRow={index === projectsCount - 1}
                        className="text-left py-3 px-5">
                        {stringEllipsis(description, 120)}
                      </Td>
                      <Td
                        isLastRow={index === projectsCount - 1}
                        className="text-center py-3 px-5">
                        {new Date(dateCreated).toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </Td>
                      <Td
                        align="center"
                        isLastRow={index === projectsCount - 1}>
                        {isCompleted ? (
                          <FaCheckCircle size={14} className="text-green-500" />
                        ) : (
                          <FaMinusCircle size={14} />
                        )}
                      </Td>
                      <Td
                        position="end"
                        isLastRow={index === projectsCount - 1}
                        className="text-left py-3 px-5">
                        {type === "READY_PROJECT" ? (
                          <ProjectActions
                            id={id}
                            uploadedScreensCount={uploadedScreensCount}
                            deleteProjectHandler={deleteProjectHandler}
                          />
                        ) : (
                          <div className="flex items-center justify-center gap-3 relative">
                            <Link href={`/admin/projects`}>
                              <Image
                                src={editIcon}
                                alt="edit"
                                className="w-5"
                              />
                            </Link>
                            <button
                              onClick={deleteProjectHandler}
                              data-project-id={id}>
                              <Image
                                src={deleteIcon}
                                alt="delete"
                                className="w-5"
                              />
                            </button>
                          </div>
                        )}
                      </Td>
                    </tr>
                  ),
                )}
              </tbody>
            </Table>
            <div className={"hidden lg:block px-20 md:px-12 sm:px-4 xs:px-0"}>
              <Carousel childrenCount={projectsGroupsArr?.length}>
                {projectsGroupsArr?.map((group, arrIndex) => (
                  <div key={arrIndex} className="px-2">
                    <div className="flex flex-col gap-3">
                      {group?.map(({ id, title, description, dateCreated }) => (
                        <ProjectDisplayBoxMob
                          key={id}
                          id={id}
                          title={title}
                          description={description}
                          dateCreated={dateCreated}
                          deleteProjectHandler={deleteProjectHandler}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </>
        )
      ) : (
        <div className="flex justify-center pt-6">
          <Spinner size={"lg"} text={"Loading projects..."} />
        </div>
      )}
    </>
  );
};

export default ProjectsDisplay;
