import { AdminHeader } from "@/containers";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <main>
      <AdminHeader />
      {children}
    </main>
  );
};

export default AdminLayout;
