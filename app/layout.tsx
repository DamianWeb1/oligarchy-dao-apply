import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Join OligarchyDAO",
  description: "Apply to join the carefully selected OligarchyDAO community.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
