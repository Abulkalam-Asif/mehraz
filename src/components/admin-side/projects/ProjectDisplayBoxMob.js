"use client";
import { deleteIcon, editIcon } from "@/assets";
import { stringEllipsis } from "@/utilities/admin-side/stringEllipsis";
import Image from "next/image";
import Link from "next/link";
import { ProjectActionsMobile } from "@/components";
import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";
const ProjectDisplayBoxMob = ({
  id = "",
  title = "",
  description = "",
  dateCreated = new Date(),
  uploadedScreensCount = 0,
  type = "",
  deleteProjectHandler = () => {},
}) => {
  return (
    <>
      <div className="py-4 px-5 border-2 border-black rounded-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-bold uppercase">{title}</h2>
          {type === "READY_PROJECT" && uploadedScreensCount === 4 ? (
            <FaCheckCircle size={14} className="text-green-500" />
          ) : (
            <FaMinusCircle size={14} />
          )}
        </div>
        <p className="text-sm">{stringEllipsis(description, 120)}</p>
        <h3 className="text-lg font-bold my-2">
          {new Date(dateCreated).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </h3>
        {type === "READY_PROJECT" ? (
          <ProjectActionsMobile
            id={id}
            uploadedScreensCount={uploadedScreensCount}
            deleteProjectHandler={deleteProjectHandler}
          />
        ) : (
          <div className="flex items-center gap-5 ml-2">
            <Link href={"/"}>
              <Image src={editIcon} alt="edit" className="w-6" />
            </Link>
            <button onClick={deleteProjectHandler} data-project-id={id}>
              <Image src={deleteIcon} alt="delete" className="w-6" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectDisplayBoxMob;
