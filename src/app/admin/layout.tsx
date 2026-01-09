import { AdminSidebar } from "src/containers/AdminSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminSidebar />
      {children}
    </>
  );
}
