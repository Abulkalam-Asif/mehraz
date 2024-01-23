import React from "react";

const Dropzone = ({ content, title, className }) => {
  return (
    <>
      <label
        title={title}
        htmlFor="dropzone-file"
        className={`${className} flex flex-col items-center justify-center border-2 rounded-xl cursor-pointer bg-white shadow-3xl`}>
        {content}
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </>
  );
};

export default Dropzone;
