"use client";
import React, { useState } from "react";
import AdminDashboardDropdown from "./AdminDashboardDropdown";

const AdminDashboardDropdowns = ({ linksCategories, linksData }) => {
  const initialDropdownState = {
    uploads: false,
    groupChats: false,
    members: false,
    teamsAndOthers: false,
  };

  const [areDropdownsExpanded, setAreDropdownsExpanded] =
    useState(initialDropdownState);

  const dropdownHandler = (dropdownName) => {
    setAreDropdownsExpanded((prevState) => {
      return {
        ...initialDropdownState,
        [dropdownName]: !prevState[dropdownName],
      };
    });
  };

  return (
    <>
      {linksCategories.map(({ title, name }) => (
        <AdminDashboardDropdown
          title={title}
          name={name}
          items={linksData[name]}
          dropdownHandler={dropdownHandler}
          isDropdownExpanded={areDropdownsExpanded[name]}
        />
      ))}
    </>
  );
};

export default AdminDashboardDropdowns;
