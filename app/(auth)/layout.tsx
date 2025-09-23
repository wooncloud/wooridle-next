import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "로그인 | 우리들의 게시판",
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
        {children}
      </body>
    </html>
  );
}
