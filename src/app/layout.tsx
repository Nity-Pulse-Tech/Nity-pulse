import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NITY PULSE",
  description:
    "Innovative technology and design solutions for collaborative teams and startups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
