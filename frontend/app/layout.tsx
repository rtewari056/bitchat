import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Global style
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bit Chat",
  description: "BitChat is a real-time chat application made using Next js with user authentication. It allows multiple users to have a private and group chat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
