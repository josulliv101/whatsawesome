import { Inter } from "next/font/google";
import { HubContextProvider } from "@/components/HubContext";
import { PageLayout } from "./components/PageLayout";
import { PropsWithChildren, ReactNode } from "react";
import { PrimaryKeyType } from "@mswjs/data/lib/glossary";
import { PrimaryTagType } from "@/lib/tags";
import { getCurrentUser } from "@/lib/auth";
import { AuthContextProvider } from "@/components/AuthContext";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

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

export default async function RootLayout({
  children,
  params: { tags = [] },
}: PropsWithChildren<{ params: { tags: string[] } }>) {
  const user = await getCurrentUser();
  return (
    <AuthContextProvider user={user?.toJSON()}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className} antialiased bg-gray-50 dark:bg-black`}
        >
          <ThemeProvider attribute="class">
            <HubContextProvider initialValue={tags[1] as PrimaryTagType}>
              <PageLayout>{children}</PageLayout>
            </HubContextProvider>
          </ThemeProvider>
        </body>
      </html>
    </AuthContextProvider>
  );
}
