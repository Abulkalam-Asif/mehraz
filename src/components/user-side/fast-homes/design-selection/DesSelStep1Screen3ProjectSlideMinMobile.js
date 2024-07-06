import { circleCheckIcon } from "@/assets";
import Image from "next/image";
import { ULinkButton } from "@/components";

const DesSelStep1Screen3ProjectSlideMinMobile = ({
  project,
  seeMoreHandler,
}) => {
  return (
    <>
      <div
        key={project.id}
        className="rounded-lg shadow-btn border border-black border-opacity-25 overflow-hidden">
        <div className="h-[16vh]">
          <Image
            src={project.image}
            width={500}
            height={500}
            className="h-full w-full object-cover"
            alt="Project image"
          />
        </div>
        <div className="h-[20vh] flex flex-col overflow-y-auto">
          <h1 className="text-xs font-bold text-center">
            {project.style.name}
          </h1>
          <div className="uppercase text-black/90 mt-1 w-full">
            <div className="block">
              <div className="w-full flex items-center justify-between gap-1 border border-black/30 rounded px-1 py-0.5 relative before:absolute before:z-[-1] before:top-0 before:left-0 before:right-0 before:bottom-0 before:shadow-btn before:opacity-60">
                <div className="block sm:hidden text-xs space-y-0.5 font-bold">
                  <h4>design.</h4>
                  <h4>constr.</h4>
                </div>
                <div className="hidden sm:block text-xxs space-y-0.5 font-bold">
                  <h4>des.</h4>
                  <h4>con.</h4>
                </div>
                <div className="uppercase px-2 py-0.5 rounded text-xs sm:text-xxs font-bold opacity-80 bg-[#EFEFEF]/70">
                  <div>
                    {project.productRates[0]} <span></span>
                  </div>
                  <div>
                    {project.constructionRates[0]} <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-1 pb-2 flex flex-col items-center gap-1 text-sm sm:text-xs px-4">
            <button
              onClick={seeMoreHandler}
              className="bg-[#D9BF77] px-4 py-1 rounded-full shadow-btn uppercase w-full">
              see more
            </button>
            <button className="bg-[#D9BF77] px-4 py-1 rounded-md shadow-btn uppercase w-full">
              select
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesSelStep1Screen3ProjectSlideMinMobile;
