import { AdminHeader } from "@/containers";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <main className="h-screen">
      <AdminHeader />
      {children}
    </main>
  );
};

export default AdminLayout;
