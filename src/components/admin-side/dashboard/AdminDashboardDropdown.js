"use client";
import { chevronDownIcon } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const AdminDashboardDropdown = ({
  title = "",
  name,
  items,
  expandedDropdown,
  setExpandedDropdown,
}) => {
  const isExpanded = expandedDropdown === name;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      setExpandedDropdown(null);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [expandedDropdown]);

  return (
    <>
      <div className="flex flex-col items-center relative">
        <button
          className="flex items-center gap-2"
          onClick={() => setExpandedDropdown(name)}>
          <span className="uppercase text-accent-2-base text-1.5xl">
            {title}
          </span>
          <Image
            src={chevronDownIcon}
            alt="chevron down"
            className={`transition-transform duration-300 ${
              isExpanded ? "-rotate-90" : "rotate-0"
            }`}
          />
        </button>
        <div
          className={`absolute bottom-0 translate-y-full z-[1] grid ${
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          } transition-grid-rows duration-300`}>
          <ul
            className={`flex flex-col overflow-hidden bg-accent-2-base ${
              isExpanded ? "py-4" : "p-0"
            } transition-padding rounded-lg`}>
            {items?.map(({ text, href }, index) => {
              return (
                <li key={index} className="text-lg uppercase text-center">
                  <Link
                    href={href}
                    className="text-white block w-full px-6 py-2">
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardDropdown;
