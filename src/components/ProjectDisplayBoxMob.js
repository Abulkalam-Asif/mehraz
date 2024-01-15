"use client";
import { deleteIcon, editIcon } from "@/assets";
import { stringEllipsis } from "@/utils/stringEllipsis";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProjectDisplayBoxMob = ({
  project_id = "",
  project_title = "",
  project_description = "",
  project_date_created = new Date(),
  deleteProjectHandler = () => {},
}) => {
  return (
    <>
      <div className="py-4 px-5 border-2 border-black rounded-xl">
        <h2 className="font-bold uppercase">{project_title}</h2>
        <p className="text-sm">{stringEllipsis(project_description, 120)}</p>
        <h3 className="text-lg font-bold my-2">
          {new Date(project_date_created).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </h3>
        <div className="flex items-center gap-5 ml-2">
          <Link href={"/"}>
            <Image src={editIcon} alt="edit" className="w-6" />
          </Link>
          <button onClick={deleteProjectHandler} data-project-id={project_id}>
            <Image src={deleteIcon} alt="delete" className="w-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectDisplayBoxMob;
