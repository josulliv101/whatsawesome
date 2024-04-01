import { Inter } from "next/font/google";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClientAPIProvider } from "@/app__/tags/[...tagIds]/GoogleMap";
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
import SmallMap from "./@sidebar/explore/[hub]/SmallMap";
import { BreadcrumbSide } from "@/components/BreadcrumbSide";
import { PresetSelector } from "./@sidebar/explore/[hub]/PresetSelector";
import MapAside from "./MapAside";
import BackButton from "@/components/BackButton";

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

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function RootLayout({
  children,
  map,
  sidebar,
  params: { hub, tags = [] },
}: PropsWithChildren<{
  map: ReactNode;
  sidebar: ReactNode;
  params: { hub: string; tags: string[] };
}>) {
  return (
    <StrictMode>
      <AuthContextProvider>
        <TooltipProvider>
          <html lang="en" suppressHydrationWarning>
            <body
              className={`${inter.className} antialiased bg-gray-50 dark:bg-black bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black`}
            >
              <ThemeProvider attribute="class">
                <ClientAPIProvider apiKey={API_KEY}>
                  <HubContextProvider initialValue={tags[1] as PrimaryTagType}>
                    <Header />
                    <div className="grid md:grid-cols-12 gap-0">
                      <main className="col-span-8 px-0 py-0 min-h-[calc(100dvh_-_73px_-_73px)]">
                        <div className="sticky_ flex justify-end right-0 top-[72px] bottom-0_ w-full  h-[360px] bg-gray-100/90">
                          <aside className="bg-gray-200 p-8 w-[22vw] border-r border-gray-300">
                            <h2 className="hidden font-semibold text-lg mb-2">
                              Welcome to Blue Mushroom
                            </h2>
                            <p>
                              <span className="font-semibold">
                                Blue Mushroom
                              </span>{" "}
                              is your resource for discovering excellence in the
                              world around you.
                            </p>
                            <MapAside />
                          </aside>

                          <SmallMap>{map}</SmallMap>
                        </div>
                        <div className="sticky z-50 top-[72px] bg-muted border-b flex items-center justify-between pl-4">
                          <BreadcrumbSide />
                        </div>
                        <div className="flex justify-between items-center pl-4 pr-8 pt-4 ">
                          <BackButton />
                          <PresetSelector />
                        </div>
                        {children}
                      </main>
                      <aside className="relative col-span-4 bg-muted border-l">
                        {sidebar}
                      </aside>
                    </div>
                    <Footer />
                  </HubContextProvider>
                </ClientAPIProvider>
              </ThemeProvider>
              <Toaster />
            </body>
          </html>
        </TooltipProvider>
      </AuthContextProvider>
    </StrictMode>
  );
}
