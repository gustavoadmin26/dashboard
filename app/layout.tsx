import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Dashboard Pronto", description: "Attribution and marketing performance dashboard" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
