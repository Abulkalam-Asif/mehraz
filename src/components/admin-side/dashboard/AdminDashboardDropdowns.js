"use client";
import { useState } from "react";
import { AdminDashboardDropdown } from "@/components";

const AdminDashboardDropdowns = ({ linksCategories, linksData }) => {
  const [expandedDropdown, setExpandedDropdown] = useState(null);

  return (
    <>
      {linksCategories?.map(({ title, name }, index) => (
        <AdminDashboardDropdown
          key={index}
          title={title}
          name={name}
          items={linksData[name]}
          expandedDropdown={expandedDropdown}
          
          setExpandedDropdown={setExpandedDropdown}
        />
      ))}
    </>
  );
};

export default AdminDashboardDropdowns;
