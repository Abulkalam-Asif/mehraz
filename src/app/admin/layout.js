import { AlertProvider } from "../context/AlertContext";
import { AdminHeader, AlertContainer } from "@/components";
const AdminLayout = ({ children }) => {
  return (
    <AlertProvider>
      <main className="h-screen">
        <AdminHeader />
        <AlertContainer />
        {children}
      </main>
    </AlertProvider>
  );
};

export default AdminLayout;
