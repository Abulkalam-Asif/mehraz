import { Roboto } from "next/font/google";
import StoreProvider from "./StoreProvider";
import "./globals.css";

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
        <html lang="en">
          <body className={roboto.className}>{children}</body>
        </html>
      </StoreProvider>
    </>
  );
}
