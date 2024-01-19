import React from "react";

const Table = ({ children, className = "", border = true }) => {
  return (
    <>
      <div
        className={`${
          border ? "border-2 border-accent-1-dark rounded-3xl" : ""
        } ${className}`}>
        <table className="w-full">{children}</table>
      </div>
    </>
  );
};

export default Table;
