import React from "react";

const Loading = ({ text }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 border-8 border-accent-1-dark border-b-transparent rounded-full animate-spin"></div>
        <p className="text-accent-1-dark text-lg font-medium">{text}</p>
      </div>
    </>
  );
};

export default Loading;
