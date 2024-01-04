import React from "react";

const H1 = ({ text = "", className = "", type = "general" }) => {
  let typeStyles = "";
  if (type === "general") {
    typeStyles = "text-4.5xl 2xl:text-3.5xl lg:text-2xl sm:text-xl";
  } else if (type === "admin-dashboard") {
    typeStyles = "text-3xl 2xl:text-2xl 2xl:mb-6 lg:text-xl lg:mb-12";
  }
  return (
    <>
      <h1
        className={`${className} ${typeStyles} font-bold uppercase text-center`}>
        {text}
      </h1>
    </>
  );
};

export default H1;
