import React from "react";

const RolesAnalyticsCitiesContainer = ({ children, className = "" }) => {
  return (
    <>
      <div
        className={`border-dashed border-2 border-accent-1-dark rounded-3xl px-6 py-2 ${className}`}>
        {children}
      </div>
    </>
  );
};

export default RolesAnalyticsCitiesContainer;
