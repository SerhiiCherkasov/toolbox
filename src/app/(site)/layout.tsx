import { Metadata } from "next";
import { UserWrapper } from "src/containers/Wrapper";

export const metadata: Metadata = {
  title: "Toolbox",
  description: "Set of handy tools",
  icons: {
    icon: [
      {
        url: "/toolbox-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/toolbox-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  other: {
    "color-scheme": "light dark",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <UserWrapper>{children}</UserWrapper>;
}
