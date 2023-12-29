"use client";
import { H1, LinkButton } from "@/components";
import { AdminDashboardGroup } from "@/containers";
import React from "react";

const Admin = () => {
  return (
    <>
      <section className="pb-8">
        <H1 text="welcome back to dashboard" className="mb-8" />
        <div className="flex flex-col max-w-4xl mx-auto gap-3">
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
      </section>
    </>
  );
};

export default Admin;
