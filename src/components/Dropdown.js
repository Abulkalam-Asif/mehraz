"use client";
import { useEffect, useState } from "react";
import DropdownContent from "./DropdownContent";

const Dropdown = ({
  triggerContent,
  children,
  className = "",
  buttonClassName = "",
  contentClassName = "",
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown((prevState) => !prevState);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      setShowDropdown(null);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdown]);

  return (
    <>
      <div className={`relative ${className}`}>
        <button className={buttonClassName} onClick={toggleDropdown}>
          {triggerContent}
        </button>
        {showDropdown && (
          <DropdownContent className={contentClassName}>
            {children}
          </DropdownContent>
        )}
      </div>
    </>
  );
};

export default Dropdown;
