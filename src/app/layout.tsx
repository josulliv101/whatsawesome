import "./globals.css";
import Header from "@/app/components/header";
import SystemInfo from "@/app/components/server-info";
import Footer from "@/app/components/footer";
import { PropsWithChildren } from "react";

export const metadata = {
  title: "Next.js App Router + React Server Components Demo",
  description: "Hacker News clone built with the Next.js App Router.",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#ffa52a",
};

export function Layout({ children }: PropsWithChildren) {
  return (
    <main>
      <Header />
      <div className="page">
        {children}
        <Footer />
        <SystemInfo />
      </div>
    </main>
  );
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
