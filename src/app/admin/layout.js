import { AdminHeader, AlertContainer } from "@/components";
const AdminLayout = ({ children }) => {
  return (
    <main className="h-screen">
      <AdminHeader />
      <AlertContainer />
      {children}
    </main>
  );
};

export default AdminLayout;
