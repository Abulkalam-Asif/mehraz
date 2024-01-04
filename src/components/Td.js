import React from "react";

const Td = ({
  children,
  className = "",
  position = "middle",
  isLastRow = false,
}) => {
  // position can be beginning, middle or end
  // position and isLastRow are used to determine the border styles
  let positionStyles = "";
  if (position === "beginning") {
    positionStyles = isLastRow ? "border-r-2" : "border-r-2 border-b-2";
  } else if (position === "middle") {
    positionStyles = isLastRow ? "border-x-2" : "border-x-2 border-b-2";
  } else if (position === "end") {
    positionStyles = isLastRow ? "border-l-2" : "border-l-2 border-b-2";
  }
  return (
    <>
      <td className={`${positionStyles} border-accent-1-dark ${className}`}>
        {children}
      </td>
    </>
  );
};

export default Td;
