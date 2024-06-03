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
      <div className="relative flex items-center justify-center">
        <button
          className="text-white inline-flex items-center gap-3"
          onClick={toggleDropdown}>
          <Image src={meetIcon} alt="meet" className="w-6 h-auto" />
          <span className="text-lg">MEET</span>
          <FaChevronDown
            className={`w-4 h-auto transition-transform duration-300 ${
              isDropdownOpen ? "-rotate-90" : ""
            }`}
          />
        </button>
        <div
          className={`bg-white rounded-2xl shadow-dropdown-2 absolute top-12 grid transition-grid-rows-opacity-padding duration-300 ${
            isDropdownOpen
              ? "grid-rows-[1fr] p-2 opacity-100"
              : "grid-rows-[0fr] p-0 opacity-0"
          }`}>
          <div className={`overflow-hidden uppercase w-max flex flex-col`}>
            <Link
              href="/"
              className="inline-flex items-center gap-8 px-4 py-2 m-1">
              <Image src={phoneIcon} alt="phone" className="w-5 h-auto" />
              <span className="flex-1 text-center">schedule a call</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-8 px-4 py-2 m-1">
              <Image src={meetupIcon} alt="meet up" className="w-5 h-auto" />
              <span className="flex-1 text-center">schedule a meet up</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHeaderMeetBtn;
