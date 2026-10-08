import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "User Management | Next.js + Spring Boot",
  description: "User management application using Next.js and Spring Boot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}