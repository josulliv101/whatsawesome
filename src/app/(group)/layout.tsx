import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ClientAPIProvider } from "@/app__/tags/[...tagIds]/GoogleMap";
import { Toaster } from "@/components/ui/sonner";
import { HubContextProvider } from "@/components/HubContext";
// import { PageLayout } from "./components/PageLayout";
import { PropsWithChildren, ReactNode, StrictMode, Suspense } from "react";
import { PrimaryKeyType } from "@mswjs/data/lib/glossary";
import { PrimaryTagType } from "@/lib/tags";
import { getCurrentUser } from "@/lib/auth";
import { AuthContextProvider } from "@/components/AuthContext";

import { ThemeProvider } from "@/components/ThemeProvider";
import useAuthentication from "@/components/useAuthentication";

import Footer from "@/app__/components/footer";
import Header from "@/components/Header";
import { BreadcrumbWithDropdown } from "@/components/BreadcrumbWithDropdown";
import MapPanel from "./explore/[hub]/MapPanel";
import SmallMap from "./@sidebar/explore/[hub]/SmallMap";
import { BreadcrumbSide } from "@/components/BreadcrumbSide";
import { PresetSelector } from "./@sidebar/explore/[hub]/PresetSelector";
import MapAside from "../MapAside";
import BackButton from "@/components/BackButton";
import { Separator } from "@/components/ui/separator";
import { CommandMenu } from "@/components/CommandMenu";
import { config } from "@/lib/config";
import AsideBlurb from "./explore/[hub]/AsideBlurb";
import {
  BadgeCheckIcon,
  CheckSquare,
  SquareIcon,
  VerifiedIcon,
} from "lucide-react";
import { CheckboxIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        <ThemeProvider attribute="class">
          <ClientAPIProvider apiKey={API_KEY}>
            <HubContextProvider initialValue={tags[1] as PrimaryTagType}>
              <Header />
              <div className="grid md:grid-cols-12 gap-0">
                <main className="relative col-span-8 px-0 py-0 min-h-[calc(100dvh_-_73px_-_73px)]">
                  <div className="sticky_ flex justify-end right-0 top-[72px] bottom-0_ w-full  h-[360px] bg-gray-100/90">
                    <aside className="bg-gray-200 px-8 pt-8 pb-4 w-[30vw] border-r border-gray-300 flex flex-col items-start justify-between">
                      <div className="bg-gray-300_ py-3_ _px-5">
                        <Suspense>
                          <AsideBlurb />
                        </Suspense>
                      </div>
                      <div>
                        <MapAside />
                        <Button
                          size="sm"
                          variant={"ghost"}
                          className="flex mt-20 font-normal items-center gap-2 text-muted-foreground_"
                        >
                          <SquareIcon className="h-4 w-4" /> Limit search
                          results to map bounds.
                        </Button>
                      </div>
                    </aside>

                    <SmallMap>{map}</SmallMap>
                  </div>
                  <div className="sticky z-50 top-[62px] bg-muted border-b flex items-center justify-between pl-4">
                    <BreadcrumbSide />
                  </div>
                  <div className="relative flex justify-start min-h-[48px] w-full items-center pl-4 pr-8 pt-0 mb-[32px] ">
                    <Suspense>
                      <BackButton hub={hub} />
                    </Suspense>
                    <Tabs
                      defaultValue="all"
                      className="w-full_ absolute top-2 right-2"
                    >
                      <div className="flex items-center justify-start px-4 py-2">
                        <TabsList className="">
                          <TabsTrigger
                            value="all"
                            className="aria-selected:bg-white h-12"
                            asChild
                          >
                            <Link href="?">
                              <BadgeCheckIcon className="h-4 w-4 mr-1.5 text-blue-500 opacity-80 " />{" "}
                              Areas of Excellence
                            </Link>
                          </TabsTrigger>
                          <TabsTrigger
                            value="unread"
                            className="aria-selected:bg-white h-12"
                            asChild
                          >
                            <Link href="?catalog=true">Browse Profiles</Link>
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent value="account">as</TabsContent>
                      <TabsContent value="password">aa</TabsContent>
                    </Tabs>
                  </div>

                  <div className="mt-10">{children}</div>
                </main>
                <aside className="relative col-span-4 bg-muted border-l">
                  {sidebar}
                </aside>
              </div>
              <Footer />
            </HubContextProvider>
          </ClientAPIProvider>
        </ThemeProvider>
      </AuthContextProvider>
    </StrictMode>
  );
}
