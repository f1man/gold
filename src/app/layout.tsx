import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Korea Gold Exchange - Premium Tracker",
  description: "Real-time gold price tracker, updated 4 times a day with premium charts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
