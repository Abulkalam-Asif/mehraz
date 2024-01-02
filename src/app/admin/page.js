"use client";
import { H1, LinkButton } from "@/components";
import { AdminDashboardDropdown, AdminDashboardGroup } from "@/containers";
import React, { useState } from "react";

const dropdownItems = {
  uploads: [
    { text: "projects", href: "/admin/projects" },
    { text: "blogs", href: "/admin/blogs" },
    { text: "custom rates", href: "/admin/custom-rates" },
    { text: "product rates", href: "/admin/product-rates" },
  ],
  groupChats: [
    { text: "client groups", href: "/admin/client-groups" },
    { text: "customer support", href: "/admin/customer-support" },
  ],
  members: [
    { text: "clients", href: "/admin/clients" },
    { text: "users", href: "/admin/users" },
  ],
  teamsAndOthers: [
    {
      text: "roles, analytics & cities",
      href: "/admin/roles-analytics-cities",
    },
    { text: "team, about us & banner", href: "/admin/team-aboutus-banner" },
  ],
};

const Admin = () => {
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
      <section className="pb-4 px-8">
        <H1
          text="welcome back to dashboard"
          className="mb-8 2xl:mb-6 lg:mb-12"
        />
        {/* This div will be displayed for over 1024px width */}
        <div className="flex flex-col max-w-4xl mx-auto gap-3 2xl:max-w-2xl lg:hidden">
          <div className="flex items-end gap-3">
            <AdminDashboardGroup title={"uploads"} className="flex-col">
              <LinkButton href="/admin/projects" text="projects" />
              <LinkButton href="/admin/blogs" text="blogs" />
              <LinkButton href="/admin/custom-rates" text="custom rates" />
              <LinkButton href="/admin/product-rates" text="product rates" />
            </AdminDashboardGroup>
            <AdminDashboardGroup title={"group chats"} className="flex-col">
              <LinkButton href="/admin/client-groups" text="client groups" />
              <LinkButton
                href="/admin/customer-support"
                text="customer support"
              />
            </AdminDashboardGroup>
          </div>
          <AdminDashboardGroup title={"members"} className="flex-row">
            <LinkButton href="/admin/clients" text="clients" />
            <LinkButton href="/admin/users" text="users" />
          </AdminDashboardGroup>
          <AdminDashboardGroup title={"teams & others"} className="flex-col">
            <LinkButton
              href="/admin/roles-analytics-cities"
              text="roles, analytics & cities"
            />
            <LinkButton
              href="/admin/team-aboutus-banner"
              text="team, about us & banner"
            />
          </AdminDashboardGroup>
        </div>
        {/* This div will be displayed for up to 1024px width */}
        <div className="hidden lg:flex flex-col gap-6">
          <AdminDashboardDropdown
            title="uploads"
            name="uploads"
            items={dropdownItems.uploads}
            dropdownHandler={dropdownHandler}
            isDropdownExpanded={areDropdownsExpanded.uploads}
          />
          <AdminDashboardDropdown
            title="group chats"
            name="groupChats"
            items={dropdownItems.groupChats}
            dropdownHandler={dropdownHandler}
            isDropdownExpanded={areDropdownsExpanded.groupChats}
          />
          <AdminDashboardDropdown
            title="members"
            name="members"
            items={dropdownItems.members}
            dropdownHandler={dropdownHandler}
            isDropdownExpanded={areDropdownsExpanded.members}
          />
          <AdminDashboardDropdown
            title="teams & others"
            name="teamsAndOthers"
            items={dropdownItems.teamsAndOthers}
            dropdownHandler={dropdownHandler}
            isDropdownExpanded={areDropdownsExpanded.teamsAndOthers}
          />
        </div>
      </section>
    </>
  );
};

export default Admin;
