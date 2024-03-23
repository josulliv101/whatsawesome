import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { HubContextProvider } from "@/components/HubContext";
// import { PageLayout } from "./components/PageLayout";
import { PropsWithChildren, ReactNode, StrictMode } from "react";
import { PrimaryKeyType } from "@mswjs/data/lib/glossary";
import { PrimaryTagType } from "@/lib/tags";
import { getCurrentUser } from "@/lib/auth";
import { AuthContextProvider } from "@/components/AuthContext";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import useAuthentication from "@/components/useAuthentication";

import Footer from "@/app__/components/footer";
import Header from "@/components/Header";
import { BreadcrumbWithDropdown } from "@/components/BreadcrumbWithDropdown";
import MapPanel from "./explore/[hub]/MapPanel";

export const metadata = {
  title: "Next.js App Router + React Server Components Demo",
  description: "Hacker News clone built with the Next.js App Router.",
  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({ subsets: ["latin"] });
// export const viewport = {
//   themeColor: "#ffa52a",
// };

export default function RootLayout({
  children,
  sidebar,
  params: { hub, tags = [] },
}: PropsWithChildren<{
  sidebar: ReactNode;
  params: { hub: string; tags: string[] };
}>) {
  return (
    <StrictMode>
      <AuthContextProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${inter.className} antialiased bg-gray-50 dark:bg-black bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black`}
          >
            <ThemeProvider attribute="class">
              <HubContextProvider initialValue={tags[1] as PrimaryTagType}>
                <Header />
                <div className="grid md:grid-cols-12 gap-8">
                  {/* <Breadcrumb /> */}
                  <aside className="col-span-5 bg-muted">{sidebar}</aside>
                  <main className="col-span-7 px-0 py-0 min-h-[calc(100dvh_-_73px_-_73px)]">
                    {children}
                  </main>
                </div>
                <Footer />
              </HubContextProvider>
            </ThemeProvider>
            <Toaster />
          </body>
        </html>
      </AuthContextProvider>
    </StrictMode>
  );
}
