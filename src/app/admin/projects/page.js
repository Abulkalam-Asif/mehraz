"use client";
import { chevronLeftIcon, deleteIcon, editIcon } from "@/assets";
import {
  H1,
  LinkButton,
  Loading,
  ProjectDisplayBoxMob,
  Td,
  Th,
} from "@/components";
import { Carousel, Table } from "@/containers";
import { stringEllipsis } from "@/utils/stringEllipsis";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import fetchAllProjects from "@/Firebase/fetchAllProjects";

const projects1 = [
  {
    project_id: "project1",
    project_title: "Modern Residence Design",
    project_description:
      "Design and plan a modern residential building with a focus on sustainable architecture and energy efficiency. Incorporate innovative materials and technologies to create a comfortable and eco-friendly living space.",
    project_date_created: new Date().getTime(),
  },
  {
    project_id: "project2",
    project_title: "Urban Renewal Project",
    project_description:
      "Revitalize an urban area by proposing architectural solutions that enhance both functionality and aesthetics. Consider factors such as community engagement, green spaces, and mixed-use developments to create a thriving urban environment.",
    project_date_created: new Date().getTime(),
  },
  {
    project_id: "project3",
    project_title: "Commercial Complex Design",
    project_description:
      "Develop a design for a state-of-the-art commercial complex, optimizing space utilization and creating an attractive and functional environment for businesses. Pay special attention to architectural features that promote collaboration and productivity.",
    project_date_created: new Date().getTime(),
  },
  {
    project_id: "project4",
    project_title: "Cultural Center Expansion",
    project_description:
      "Expand an existing cultural center with a thoughtful architectural design that seamlessly integrates with the original structure. Enhance the cultural and artistic aspects while providing modern amenities and accessibility.",
    project_date_created: new Date().getTime(),
  },
  {
    project_id: "project5",
    project_title: "Sustainable Housing Project",
    project_description:
      "Design an eco-friendly housing project that incorporates sustainable practices, renewable energy sources, and green building materials. Prioritize energy efficiency, water conservation, and a healthy living environment.",
    project_date_created: new Date().getTime(),
  },
  {
    project_id: "project6",
    project_title: "Healthcare Facility Renovation",
    project_description:
      "Renovate an existing healthcare facility with a focus on patient comfort, staff efficiency, and the latest medical technologies. Ensure compliance with healthcare regulations while creating a welcoming and healing environment.",
    project_date_created: new Date().getTime(),
  },
  {
    project_id: "project7",
    project_title: "Educational Campus Master Plan",
    project_description:
      "Develop a master plan for an educational campus, considering the optimal layout of academic buildings, recreational areas, and student residences. Prioritize connectivity, sustainability, and a conducive learning environment.",
    project_date_created: new Date().getTime(),
  },
  {
    project_id: "project8",
    project_title: "Mixed-Use Development",
    project_description:
      "Create a design for a mixed-use development that seamlessly integrates residential, commercial, and recreational spaces. Emphasize walkability, community engagement, and a vibrant urban atmosphere.",
    project_date_created: new Date().getTime(),
  },
];

// convert projects array into an array of arrays with 2 projects each
const projectsArray1 = projects1.reduce((acc, project, index) => {
  const arrayIndex = Math.floor(index / 2);
  acc[arrayIndex] = [...(acc[arrayIndex] || []), project];
  return acc;
}, []);

const Projects = () => {
  const [projects, setProjects] = useState(null);
  const [projectsArray, setProjectsArray] = useState(null);

  useEffect(() => {
    fetchAllProjects().then((projects) => {
      const newProjects = projects.map((project) => {
        return { ...project.data, project_id: project.id };
      });
      setProjects(newProjects);
    });
  }, []);

  useEffect(() => {
    if (projects) {
      const projectsArray = projects.reduce((acc, project, index) => {
        const arrayIndex = Math.floor(index / 2);
        acc[arrayIndex] = [...(acc[arrayIndex] || []), project];
        return acc;
      }, []);
      setProjectsArray(projectsArray);
    }
  }, [projects]);

  const deleteProjectHandler = (e) => {
    const projectId = e.currentTarget.dataset.projectId;
    console.log("ProjectId: ", projectId);
    // TODO: delete project from database
  };
  return (
    <>
      <section className="pb-4 px-8">
        <div className="max-w-8xl mx-auto">
          <div className="flex justify-between items-center py-6">
            <Link
              href={"/admin"}
              className="p-6 bg-accent-1-base rounded-full 2xl:p-5 lg:p-4 md:hidden">
              <Image
                src={chevronLeftIcon}
                alt="chevron left"
                className="w-8 2xl:w-6 lg:w-4"
              />
            </Link>
            <H1 text="projects" />
            <LinkButton
              href="/admin/projects/create-new"
              text="create new +"
              className="lg:text-base sm:text-sm"
            />
          </div>
          {projects ? (
            <>
              <Table className="max-w-8xl lg:hidden">
                <thead className="uppercase text-1.5xl whitespace-nowrap 2xl:text-lg">
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
                <tbody className="text-lg 2xl:text-base">
                  {projects.length === 0 ? (
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
                            isLastRow={index === projects.length - 1}
                            className="text-left py-3 px-5">
                            {project_title}
                          </Td>
                          <Td
                            isLastRow={index === projects.length - 1}
                            className="text-left py-3 px-5">
                            {stringEllipsis(project_description, 120)}
                          </Td>
                          <Td
                            isLastRow={index === projects.length - 1}
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
                            isLastRow={index === projects.length - 1}
                            className="text-left py-3 px-5">
                            <div className="flex items-center justify-center gap-3">
                              <Link href={"/"}>
                                <Image
                                  src={editIcon}
                                  alt="edit"
                                  className="w-6 2xl:w-5"
                                />
                              </Link>
                              <button
                                onClick={deleteProjectHandler}
                                data-project-id={project_id}>
                                <Image
                                  src={deleteIcon}
                                  alt="delete"
                                  className="w-6 2xl:w-5"
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
                <Carousel>
                  {projectsArray?.map((projects, arrIndex) => (
                    <div key={arrIndex}>
                      <div className="flex flex-col gap-3">
                        {projects.map(
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
              <Loading text={"Loading projects"} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Projects;
