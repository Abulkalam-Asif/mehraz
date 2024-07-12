"use client";
import { stringEllipsis } from "@/utilities/admin-side/stringEllipsis";
import {
  Carousel,
  Table,
  ProjectDisplayBoxMob,
  Td,
  Th,
  ProjectActions,
} from "@/components";
import { useContext, useEffect, useState } from "react";
import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";
import createProjectGroupsArr from "@/utilities/admin-side/projects/createProjectGroupsArr";
import { deleteIcon, editIcon } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { AlertContext } from "@/context/AlertContext";

const ProjectsDisplay = ({
  freeProjects,
  readyProjects,
  isErrorOccurredWhileFetching,
}) => {
  const projects =
    (freeProjects && readyProjects && [...readyProjects, ...freeProjects]) ||
    [];
  const projectsCount = projects?.length || 0;
  const { showAlert } = useContext(AlertContext);

  const [projectsGroupsArr, setProjectsGroupsArr] = useState(null);
  useEffect(() => {
    if (projects && !isErrorOccurredWhileFetching) {
      // Converting the projects array into array of arrays of 2 to be displayed in carousel on mobile
      const projectsGroupsArr = createProjectGroupsArr(projects);
      setProjectsGroupsArr(projectsGroupsArr);
    } else {
      console.log(projects && !isErrorOccurredWhileFetching);
      setProjectsGroupsArr([]);
      showAlert({
        type: "ERROR",
        message:
          "An error occurred while fetching data. Please check your internet connection and try again.",
      });
    }
  }, []);

  const deleteProjectHandler = e => {
    const projectId = e.currentTarget.dataset.projectId;
  };

  return (
    <>
      {projectsCount === 0 ? (
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
                    <Td align="center" isLastRow={index === projectsCount - 1}>
                      {type === "READY_PROJECT" &&
                      uploadedScreensCount === 4 ? (
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
                            <Image src={editIcon} alt="edit" className="w-5" />
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
                    {group?.map(
                      ({
                        id,
                        title,
                        description,
                        dateCreated,
                        type,
                        uploadedScreensCount,
                      }) => (
                        <ProjectDisplayBoxMob
                          key={id}
                          id={id}
                          title={title}
                          description={description}
                          dateCreated={dateCreated}
                          deleteProjectHandler={deleteProjectHandler}
                          type={type}
                          uploadedScreensCount={uploadedScreensCount}
                        />
                      ),
                    )}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </>
      )}
    </>
  );
};

export default ProjectsDisplay;
