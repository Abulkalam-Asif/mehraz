import { UserHeader } from "@/components";
import localFont from "next/font/local";

const proximaNova = localFont({
  src: [
    {
      path: "../fonts/proximaNova/proximaNovaLight.otf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../fonts/proximaNova/proximaNovaRegular.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../fonts/proximaNova/proximaNovaSemibold.otf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../fonts/proximaNova/proximaNovaBold.otf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../fonts/proximaNova/proximaNovaExtrabold.otf",
      style: "normal",
      weight: "800",
    },
    {
      path: "../fonts/proximaNova/proximaNovaBlack.otf",
      style: "normal",
      weight: "900",
    },
  ],
  display: "swap",
});

const UserLayout = ({ children }) => {
  return (
    <>
      <main className={`flex flex-col h-screen ${proximaNova.className}`}>
        <UserHeader />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </>
  );
};

export default UserLayout;
