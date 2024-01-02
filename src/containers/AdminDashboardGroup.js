import React from "react";

const AdminDashboardGroup = ({ className = "", title, children }) => {
  return (
    <>
      <div
        className={`${className} relative flex w-full items-center justify-center gap-3 p-7 pb-5 border-2 border-dashed rounded-2xl border-black border-opacity-60 2xl:p-6 2xl:pb-4`}>
        <h2 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase bg-white text-1.5xl px-4 py-1 2xl:text-lg">
          {title}
        </h2>
        {children}
      </div>
    </>
  );
};

export default AdminDashboardGroup;
