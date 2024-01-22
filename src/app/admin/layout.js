import { AdminHeader } from "@/containers";
import AlertContainer from "@/containers/AlertContainer";
import { AlertProvider } from "../context/AlertContext";
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
