import "./globals.css";
import { ReactNode } from "react";
import NavBar from "@/components/NavBar/NavBar";
import { WalletConnectionProvider } from "@/lib/WalletProvider"; // ✅ your updated provider
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "KTTY World",
  description: "The 3D Pet Adventure on Ronin Network",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-[DIN2014] antialiased">
        {/* ✅ Wrap all app content in the updated wallet provider */}
        <WalletConnectionProvider>
          {/* Full-width glow header */}
          <NavBar />

          {/* Full-width body wrapper */}
          <main className="min-h-screen w-full">{children}</main>

          {/* Toast notifications */}
          <Toaster />
        </WalletConnectionProvider>
      </body>
    </html>
  );
}
