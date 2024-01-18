import React from "react";

const Th = ({ children, className = "", position = "middle" }) => {
  let positionStyles = "";
  if (position === "beginning") {
    positionStyles = "border-r-2 border-b-2";
  } else if (position === "middle") {
    positionStyles = "border-x-2 border-b-2";
  } else if (position === "end") {
    positionStyles = "border-l-2 border-b-2";
  }
  return (
    <>
      <th
        className={`uppercase text-center ${positionStyles} border-accent-1-dark ${className}`}>
        {children}
      </th>
    </>
  );
};

export default Th;
