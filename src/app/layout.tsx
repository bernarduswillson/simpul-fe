import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simpul | Quicks",
  description: "Quicks is a pop-up that allows you to quickly switch between messaging and to-do list tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>{children}</body>
    </html>
  );
}
