import React from "react";

const AdminDashboardGroup = ({ className = "", title, children }) => {
  return (
    <>
      <div
        className={`${className} relative flex w-full items-center justify-center gap-3 border-2 border-dashed rounded-2xl border-black border-opacity-60 p-6 pb-4`}>
        <h2 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase bg-white px-4 py-1 text-lg">
          {title}
        </h2>
        {children}
      </div>
    </>
  );
};

export default AdminDashboardGroup;
