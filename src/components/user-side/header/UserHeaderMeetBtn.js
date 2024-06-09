"use client";
import { meetIcon, meetupIcon, phoneIcon } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const UserHeaderMeetBtn = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleClickOutside = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <div className="relative flex items-center justify-center sm:justify-end">
        <button
          className="text-white inline-flex items-center gap-3 md:gap-2 xs:gap-1"
          onClick={toggleDropdown}>
          <Image src={meetIcon} alt="meet" className="w-6 h-auto sm:w-5" />
          <span className="text-lg md:hidden">MEET</span>
          <FaChevronDown
            className={`w-4 h-auto transition-transform duration-300 ${
              isDropdownOpen ? "-rotate-90" : ""
            }`}
          />
        </button>
        <div
          className={`bg-white rounded-2xl shadow-dropdown-2 absolute z-[2] top-12 sm:top-10 grid transition-grid-rows-opacity-padding duration-300 ${
            isDropdownOpen
              ? "grid-rows-[1fr] p-2 opacity-100"
              : "grid-rows-[0fr] p-0 opacity-0"
          }`}>
          <div
            className={`overflow-hidden uppercase w-max flex flex-col md:text-sm`}>
            <Link
              href="/"
              className="inline-flex items-center gap-8 md:gap-6 sm:gap-4 px-4 md:px-2 py-2 md:py-1 m-1">
              <Image
                src={phoneIcon}
                alt="phone"
                className="w-5 h-auto md:w-4"
              />
              <span className="flex-1 text-center">schedule a call</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-8 md:gap-6 sm:gap-4 px-4 md:px-2 py-2 md:py-1 m-1">
              <Image
                src={meetupIcon}
                alt="meet up"
                className="w-5 h-auto md:w-4"
              />
              <span className="flex-1 text-center">schedule a meet up</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHeaderMeetBtn;
