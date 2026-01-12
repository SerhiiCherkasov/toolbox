import { AdminWrapper } from "src/containers/Wrapper";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Manage Toolbox settings and users",
  icons: {
    icon: [
      {
        url: "/steering-wheel-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/steering-wheel-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  other: {
    "color-scheme": "light dark",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("auth_token")?.value;

  // todo: validate token
  // if (!token) redirect("/login?next=/admin");

  // try {
  //   const res = await fetch(`${process.env.API_BASE_URL}/auth/me`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //     cache: "no-store",
  //   });

  //   if (res.status === 401) redirect("/login?next=/admin");
  // } catch {
  //   redirect("/admin/unavailable");
  // }
  return <AdminWrapper>{children}</AdminWrapper>;
}
