"use client";
import { useEffect, useState } from "react";

const Dropdown = ({
  triggerContent,
  children,
  className = "",
  buttonClassName = "",
  contentClassName = "",
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(prevState => !prevState);

  useEffect(() => {
    const handleOutsideClick = e => {
      setShowDropdown(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdown]);

  return (
    <>
      <div className={`relative ${className}`}>
        <button
          className={buttonClassName}
          type="button"
          onClick={toggleDropdown}>
          {triggerContent}
        </button>
        {showDropdown && <div className={contentClassName}>{children}</div>}
      </div>
    </>
  );
};

export default Dropdown;
