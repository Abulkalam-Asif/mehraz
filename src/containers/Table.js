import React from "react";

const Table = ({ children, className = "" }) => {
  return (
    <>
      <div
        className={`border-2 border-accent-1-dark p-4 rounded-3xl ${className}`}>
        <table>{children}</table>
      </div>
    </>
  );
};

export default Table;
