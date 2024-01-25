const Td = ({
  children,
  className = "",
  position = "middle",
  isLastRow = false,
  align = "left",
}) => {
  // position can be beginning, middle or end
  // position and isLastRow are used to determine the border styles
  const positionStyles = {
    beginning: isLastRow ? "border-r-2" : "border-r-2 border-b-2",
    middle: isLastRow ? "border-x-2" : "border-x-2 border-b-2",
    end: isLastRow ? "border-l-2" : "border-l-2 border-b-2",
  };

  return (
    <>
      <td
        align={align}
        className={`${positionStyles[position]} border-accent-1-dark ${className}`}>
        {children}
      </td>
    </>
  );
};

export default Td;
