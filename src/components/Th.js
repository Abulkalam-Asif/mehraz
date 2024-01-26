const Th = ({ children, className = "", position = "middle" }) => {
  const positionStyles = {
    beginning: "border-r-2 border-b-2",
    middle: "border-x-2 border-b-2",
    end: "border-l-2 border-b-2",
  };

  return (
    <>
      <th
        className={`uppercase px-1 text-center ${positionStyles[position]} border-accent-1-dark ${className}`}>
        {children}
      </th>
    </>
  );
};

export default Th;
