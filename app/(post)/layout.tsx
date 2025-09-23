import type { Metadata } from "next";
import "../globals.css";
import style from './layout.module.css';
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
    <>
      <header className={style.header}>
        <Navbar />
      </header>
      <main className={style.main}>
        {children}
      </main>
      <footer>
        <Dock />
      </footer>
    </>
  );
}
