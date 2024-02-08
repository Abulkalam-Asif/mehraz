"use client";
import { stringEllipsis } from "@/utils/stringEllipsis";
import {
  Carousel,
  Table,
  Spinner,
  ProjectDisplayBoxMob,
  Td,
  Th,
} from "@/components";
import { deleteIcon, editIcon } from "@/assets";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const ProjectsDisplay = ({ projects }) => {
  const projectsCount = projects?.length;
  const [projectsGroups, setProjectsGroups] = useState(null);
  useEffect(() => {
    if (projects) {
      const projectsGroups = projects.reduce((acc, project, index) => {
        const arrayIndex = Math.floor(index / 2);
        acc[arrayIndex] = [...(acc[arrayIndex] || []), project];
        return acc;
      }, []);
      setProjectsGroups(projectsGroups);
    }
  }, [projects]);

  const deleteProjectHandler = (e) => {
    const projectId = e.currentTarget.dataset.projectId;
    console.log("ProjectId: ", projectId);
    // TODO (Will be done later) (backend): delete project from database
  };
  return (
    <>
      {projects ? (
        <>
          <Table className="max-w-8xl p-4 lg:hidden">
            <thead className="whitespace-nowrap">
              <tr>
                <Th position="beginning" className="w-2/12 py-3 px-5">
                  project title
                </Th>
                <Th className="w-2/3 py-3 px-5">description</Th>
                <Th className="w-1/12 py-3 px-5">date created</Th>
                <Th position="end" className="w-1/12 py-3 px-5">
                  action
                </Th>
              </tr>
            </thead>
            <tbody className="text-base">
              {projectsCount === 0 ? (
                <div>No Projects Found</div>
              ) : (
                projects?.map(
                  (
                    {
                      project_id,
                      project_title,
                      project_description,
                      project_date_created,
                    },
                    index
                  ) => (
                    <tr key={index}>
                      <Td
                        position="beginning"
                        isLastRow={index === projectsCount - 1}
                        className="text-left py-3 px-5">
                        {project_title}
                      </Td>
                      <Td
                        isLastRow={index === projectsCount - 1}
                        className="text-left py-3 px-5">
                        {stringEllipsis(project_description, 120)}
                      </Td>
                      <Td
                        isLastRow={index === projectsCount - 1}
                        className="text-center py-3 px-5">
                        {new Date(project_date_created).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </Td>
                      <Td
                        position="end"
                        isLastRow={index === projectsCount - 1}
                        className="text-left py-3 px-5">
                        <div className="flex items-center justify-center gap-3">
                          <Link href={"/"}>
                            <Image src={editIcon} alt="edit" className="w-5" />
                          </Link>
                          <button
                            onClick={deleteProjectHandler}
                            data-project-id={project_id}>
                            <Image
                              src={deleteIcon}
                              alt="delete"
                              className="w-5"
                            />
                          </button>
                        </div>
                      </Td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </Table>
          <div className={"hidden lg:block px-20 md:px-12 sm:px-4 xs:px-0"}>
            <Carousel childrenCount={projectsGroups?.length}>
              {projectsGroups?.map((group, arrIndex) => (
                <div key={arrIndex}>
                  <div className="flex flex-col gap-3">
                    {group?.map(
                      ({
                        project_id,
                        project_title,
                        project_description,
                        project_date_created,
                      }) => (
                        <ProjectDisplayBoxMob
                          key={project_id}
                          project_id={project_id}
                          project_title={project_title}
                          project_description={project_description}
                          project_date_created={project_date_created}
                          deleteProjectHandler={deleteProjectHandler}
                        />
                      )
                    )}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </>
      ) : (
        <div className="flex justify-center pt-6">
          <Spinner size={"lg"} text={"Loading projects..."} />
        </div>
      )}
    </>
  );
};

export default ProjectsDisplay;
