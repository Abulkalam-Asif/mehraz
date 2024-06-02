import { UserHeader } from "@/components";
import localFont from "next/font/local";

const proximaNova = localFont({
  src: [
    {
      path: "../fonts/proximaNova/proximaNovaThin.otf",
      style: "normal",
      weight: "100",
    },
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
      <main className={`h-screen ${proximaNova.className}`}>
        <UserHeader />
        {children}
      </main>
    </>
  );
};

export default UserLayout;
