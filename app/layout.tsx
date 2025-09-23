import type { Metadata } from "next";
import "./globals.css";
import Dock from "@/components/layout/dock/Dock";
import Navbar from "@/components/layout/navbar/Navbar";

export const metadata: Metadata = {
  title: "우리들의 게시판",
  description: "우리들의 게시판",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <header>
          <Navbar />
        </header>
        <main>
          {children}
        </main>
        <footer>
          <Dock />
        </footer>
      </body>
    </html>
  );
}
