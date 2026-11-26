import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/language";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "DL — Portfolio",
  description: "Desarrollo y diseño digital",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={sora.variable}>
      <body>
        <LanguageProvider>
          <SmoothScroll />
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}