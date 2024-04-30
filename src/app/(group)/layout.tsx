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
import MapSlide from "./MapSlide";

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
  map,
  sidebar,
  params: { hub, tags = [] },
}: PropsWithChildren<{
  map: ReactNode;
  sidebar: ReactNode;
  params: { hub: string; tags: string[] };
}>) {
  return (
    <div className="grid md:grid-cols-12 gap-0">
      <main className="relative col-span-8 px-0 py-0 min-h-[calc(100dvh_-_73px_-_73px)]">
        <Suspense>
          <div
            className={`sticky_ -z-0 flex justify-end right-0 top-[72px] bottom-0_ w-full  h-[360px] bg-gray-100/90`}
          >
            <aside className="overflow-visible -z-0 relative bg-gray-200 px-8 pt-8 pb-8 w-[30vw] border-r border-gray-300 flex flex-col items-start justify-between">
              <div className="bg-gray-300_ py-3_ _px-5">
                <AsideBlurb />
              </div>
              <MapAside />
            </aside>

            <SmallMap>{map}</SmallMap>
          </div>
        </Suspense>
        <Suspense>
          <MapSlide>
            <div className="sticky z-50 top-[62px] bg-muted border-b flex items-center justify-between pl-4">
              <BreadcrumbSide />
            </div>
            <div className="relative  flex justify-start min-h-[48px] w-full items-center pl-4 pr-8 pt-0 mb-[0px] ">
              <BackButton hub={hub} />

              {/* <Tabs
                      defaultValue="all"
                      className="w-full_ absolute top-2 right-2"
                    >
                      <div className="flex items-center justify-start px-4 py-2">
                        <TabsList className="h-[48px]">
                          <TabsTrigger
                            value="all"
                            className="aria-selected:bg-white h-[36px]"
                            asChild
                          >
                            <Link href="?">
                              <BadgeCheckIcon className="h-4 w-4 mr-1.5 text-blue-500 opacity-80 " />{" "}
                              Areas of Excellence
                            </Link>
                          </TabsTrigger>
                          <TabsTrigger
                            value="unread"
                            className="aria-selected:bg-white h-[36px]"
                            asChild
                          >
                            <Link href="?catalog=true">Browse Profiles</Link>
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent value="account">as</TabsContent>
                      <TabsContent value="password">aa</TabsContent>
                    </Tabs> */}
            </div>

            <div className="mt-0 bg-gray-50 min-h-48 relative z-10">
              &nbsp;{children}
            </div>
          </MapSlide>
        </Suspense>
      </main>
      <aside className="relative col-span-4 bg-muted border-l">{sidebar}</aside>
    </div>
  );
}
