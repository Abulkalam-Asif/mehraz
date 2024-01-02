import React from "react";

const H1 = ({ text = "", className = "" }) => {
  return (
    <>
      <h1 className={`${className} text-3xl font-bold uppercase text-center 2xl:text-2xl lg:text-xl`}>
        {text}
      </h1>
    </>
  );
};

export default H1;
