import React from "react";

const AdminDashboardGroup = ({ className = "", title, children }) => {
  return (
    <>
      <div
        className={`${className} relative flex w-full items-center justify-center gap-3 p-8 border-2 border-dashed rounded-2xl border-black border-opacity-60`}>
        <h2 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase bg-white text-1.5xl px-4 py-2">
          {title}
        </h2>
        {children}
      </div>
    </>
  );
};

export default AdminDashboardGroup;
