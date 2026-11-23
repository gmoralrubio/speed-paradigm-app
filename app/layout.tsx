import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Speed Paradigm App",
  description: "A Next.js project built and reviewed with three Codex agents.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
