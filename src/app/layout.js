import { Roboto } from "next/font/google";
import "@/app/globals.css";
import { AlertProvider } from "@/context/AlertContext";
import StoreProvider from "@/store/StoreProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Mehraz",
  description: "TOWARDS A NEW ERA OF ARCHITECTURE...",
  metadataBase: new URL("https://mehraz-gamma.vercel.app/"),
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={roboto.className}>
          <StoreProvider>
            <AlertProvider>{children}</AlertProvider>
          </StoreProvider>
        </body>
      </html>
    </>
  );
}
