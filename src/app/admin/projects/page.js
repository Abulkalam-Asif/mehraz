import { chevronLeftIcon } from "@/assets";
import { H1, LinkButton, ProjectsDisplay } from "@/components";
import Image from "next/image";
import Link from "next/link";
import fetchReadyProjects from "@/Firebase/admin-side/projects/fetchReadyProjects";
import fetchFreeProjects from "@/Firebase/admin-side/projects/fetchFreeProjects";

const Projects = async () => {
  let readyProjects = null,
    freeProjects = null;
  let isErrorOccurredWhileFetching = false;
  try {
    readyProjects = await fetchReadyProjects();
    freeProjects = await fetchFreeProjects();
  } catch (error) {
    isErrorOccurredWhileFetching = true;
  }

  return (
    <>
      <section className="px-8 h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="max-w-8xl w-full mx-auto">
          <div className="flex justify-between items-center py-6 xs:items-start">
            <Link
              href={"/admin"}
              className="bg-accent-1-base rounded-full p-5 lg:p-4 md:hidden">
              <Image
                src={chevronLeftIcon}
                alt="chevron left"
                className="w-6 lg:w-4"
              />
            </Link>
            <H1 text="projects" />
            <div className="flex sm:hidden items-center gap-x-6">
              <LinkButton
                href="/admin/free-project"
                text="free design +"
                className="lg:text-base"
              />
              <LinkButton
                href="/admin/ready-project?screen=1"
                text="create new +"
                className="lg:text-base"
              />
            </div>
            <div className="hidden sm:flex gap-x-4 items-center gap-y-2 xs:flex-col">
              <LinkButton
                href="/admin/free-project"
                text="free +"
                className="text-sm xs:px-3 xs:py-2"
              />
              <LinkButton
                href="/admin/ready-project?screen=1"
                text="create +"
                className="text-sm xs:px-3 xs:py-2"
              />
            </div>
          </div>
          <ProjectsDisplay
            freeProjects={freeProjects}
            readyProjects={readyProjects}
            isErrorOccurredWhileFetching={isErrorOccurredWhileFetching}
          />
        </div>
      </section>
    </>
  );
};

export default Projects;
