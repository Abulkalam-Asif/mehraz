import { Roboto } from "next/font/google";
import StoreProvider from "./StoreProvider";
import "@/app/globals.css";
import { AlertProvider } from "@/context/AlertContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Mehraz",
  description: "TOWARDS A NEW ERA OF ARCHITECTURE...",
};

export default function RootLayout({ children }) {
  return (
    <>
      <StoreProvider>
        <AlertProvider>
          <html lang="en">
            <body className={roboto.className}>{children}</body>
          </html>
        </AlertProvider>
      </StoreProvider>
    </>
  );
}
