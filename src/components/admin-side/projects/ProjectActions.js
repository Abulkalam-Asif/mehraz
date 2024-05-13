"use client";
import { useEffect, useRef, useState } from "react";
import { deleteIcon, editIcon } from "@/assets";
import Image from "next/image";
import { LinkButton } from "@/components";

const ProjectActions = ({ id, uploadedScreensCount, deleteProjectHandler }) => {
  const [showEditDropdown, setShowEditDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowEditDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showEditDropdown]);

  const handleEditButtonClick = () => {
    setShowEditDropdown(prevState => !prevState);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-3 relative">
        <button onClick={handleEditButtonClick}>
          <Image src={editIcon} alt="edit" className="w-5" />
        </button>
        <button onClick={deleteProjectHandler} data-project-id={id}>
          <Image src={deleteIcon} alt="delete" className="w-5" />
        </button>
        {showEditDropdown && (
          <div
            ref={dropdownRef}
            className="w-max absolute top-0 -left-2 -translate-x-full bg-white shadow-dropdown rounded p-2 flex flex-col gap-2">
            {Array.from(
              {
                length: uploadedScreensCount < 4 ? uploadedScreensCount + 1 : 4,
              },
              (_, screenNumber) => (
                <LinkButton
                  href={`/admin/ready-project?screen=${
                    screenNumber + 1
                  }&id=${id}`}
                  key={screenNumber + 1}
                  text={`Screen ${screenNumber + 1}`}
                  size="xs"
                />
              ),
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectActions;
