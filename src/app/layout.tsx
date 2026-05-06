import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Korea Gold Exchange - Premium Tracker",
  description: "Real-time gold price tracker, updated 4 times a day with premium charts.",
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="mainContent">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
