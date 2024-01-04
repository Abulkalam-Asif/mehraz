import { H1, LinkButton } from "@/components";
import { AdminDashboardDropdowns, AdminDashboardGroup } from "@/containers";
import React from "react";

const linksCategories = [
  {
    title: "uploads",
    name: "uploads",
  },
  {
    title: "group chats",
    name: "groupChats",
  },
  {
    title: "members",
    name: "members",
  },
  {
    title: "teams & others",
    name: "teamsAndOthers",
  },
];

const linksData = {
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
  return (
    <>
      <section className="pb-4 px-8 lg:mt-12">
        <H1
          text="welcome back to dashboard"
          type="admin-dashboard"
          className="mb-8"
        />
        {/* This div will be displayed for over 1024px width */}
        <div className="flex flex-col max-w-4xl mx-auto gap-3 2xl:max-w-2xl lg:hidden">
          <div className="flex items-end gap-3">
            <AdminDashboardGroup title={"uploads"} className="flex-col">
              {linksData.uploads.map(({ text, href }, index) => (
                <LinkButton key={index} type="admin-dashboard" href={href} text={text} />
              ))}
            </AdminDashboardGroup>
            <AdminDashboardGroup title={"group chats"} className="flex-col">
              {linksData.groupChats.map(({ text, href }, index) => (
                <LinkButton key={index} type="admin-dashboard" href={href} text={text} />
              ))}
            </AdminDashboardGroup>
          </div>
          <AdminDashboardGroup title={"members"} className="flex-row">
            {linksData.members.map(({ text, href }, index) => (
              <LinkButton key={index} type="admin-dashboard" href={href} text={text} />
            ))}
          </AdminDashboardGroup>
          <AdminDashboardGroup title={"teams & others"} className="flex-col">
            {linksData.teamsAndOthers.map(({ text, href }, index) => (
              <LinkButton key={index} type="admin-dashboard" href={href} text={text} />
            ))}
          </AdminDashboardGroup>
        </div>
        {/* This div will be displayed for up to 1024px width */}
        <div className="hidden lg:flex flex-col gap-6">
          <AdminDashboardDropdowns
            linksCategories={linksCategories}
            linksData={linksData}
          />
        </div>
      </section>
    </>
  );
};

export default Admin;
