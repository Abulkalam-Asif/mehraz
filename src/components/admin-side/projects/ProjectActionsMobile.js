"use client";
import { useEffect, useRef, useState } from "react";
import { deleteIcon, editIcon } from "@/assets";
import Image from "next/image";
import { LinkButton } from "@/components";

const ProjectActionsMobile = ({
  id,
  uploadedScreensCount,
  deleteProjectHandler,
}) => {
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
      <div className="flex items-center gap-5 sm:gap-3 ml-2">
        <button onClick={handleEditButtonClick}>
          <Image src={editIcon} alt="edit" className="w-5" />
        </button>
        {showEditDropdown && (
          <div ref={dropdownRef} className="flex gap-2">
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
                  text={`${screenNumber + 1}`}
                  size="xxs"
                />
              ),
            )}
          </div>
        )}
        <button onClick={deleteProjectHandler} data-project-id={id}>
          <Image src={deleteIcon} alt="delete" className="w-5" />
        </button>
      </div>
    </>
  );
};

export default ProjectActionsMobile;
