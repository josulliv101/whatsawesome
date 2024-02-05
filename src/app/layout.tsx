import { HubContextProvider } from "@/components/HubContext";
import { PageLayout } from "./components/PageLayout";

import "./globals.css";

import { PropsWithChildren, ReactNode } from "react";
import { PrimaryKeyType } from "@mswjs/data/lib/glossary";
import { PrimaryTagType } from "@/lib/tags";
import { CookiesProvider } from "@/components/Cookies";
// import { FilterContextProvider } from "@/components/FilterContext";

export const metadata = {
  title: "Next.js App Router + React Server Components Demo",
  description: "Hacker News clone built with the Next.js App Router.",
  robots: {
    index: true,
    follow: true,
  },
};

// export const viewport = {
//   themeColor: "#ffa52a",
// };

export default function RootLayout({
  children,
  params: { tags = [] },
}: PropsWithChildren<{ params: { tags: string[] } }>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <HubContextProvider initialValue={tags[1] as PrimaryTagType}>
          <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <PageLayout>{children}</PageLayout>
          </CookiesProvider>
        </HubContextProvider>
      </body>
    </html>
  );
}
