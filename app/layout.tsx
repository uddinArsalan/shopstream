import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderWrapper from './components/HeaderWrapper';
import CartContextProvider from "./context/CartContext";
import AppProvider from "./context/AppProvider";
import CartDialog from "./components/CartDialog";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopStream",
  description: "Shop the latest products at great prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
        <CartContextProvider>
        <HeaderWrapper />  
          {/* <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-24"> */}
            {children}
          {/* </main> */}
          <CartDialog />
        </CartContextProvider>
        </AppProvider>
      </body>
    </html>
  );
}
