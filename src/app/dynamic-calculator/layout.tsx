import type { Metadata } from "next";
import { Sidebar } from "src/containers/Sidebar";

export const metadata: Metadata = {
  title: "Dynamic Calculator",
  description: "Use it to simplify complex calculations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
