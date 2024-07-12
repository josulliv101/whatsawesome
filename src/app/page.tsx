import { CommandMenu } from "@/components/CommandMenu";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { ChevronRightIcon, EqualIcon, TelescopeIcon } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import Breadcrumb from "./(foobargroup)/foobar/explore/[hub]/[pt]/[t3]/[distance]/[pg]/Breadcrumb";
import React, { PropsWithChildren } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  console.log("rendering home page");
  return (
    <>
      <div className="bg-gray-300/80 bg-[url('/support-waves.svg')] ">
        <div className="container mx-auto max-w-[1080px] pb-4 pt-6 h-full">
          <div className="grid grid-cols-12 rounded-lg overflow-hidden">
            <div className="col-span-12 md:col-span-12 rounded-lg overflow-hidden bg-gray-100 h-[320px] p-8 flex gap-2 items-start w-full">
              <div className="flex items-center flex-1">
                <Link href="/">
                  <img
                    className="w-6 h-6 relative mr-1.5"
                    src={config.logoPath}
                    width="24"
                    height="24"
                  />
                </Link>
                <div className="flex items-center gap-2 opacity-75">
                  <span className="opacity-20 pl-1.5">/</span>
                  <span className="opacity-70">20 Mushrooms</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Callout title="How It Works">
                  <div className="flex items-center justify-between gap-4 w-full">
                    <img
                      className="h-12 w-12 min-w-12 opacity-90 stroke-1 bg-gray-200 rounded-full p-3.5 border-2 border-gray-300"
                      src={config.logoPath}
                      width="24"
                      height="24"
                    />
                    <div>
                      Leave a mushroom on dishes you endorse. Spend your
                      mushrooms wisely - you only get 20.
                    </div>
                  </div>
                </Callout>
                <Separator className="opacity-100 bg-gray-300" />
                <Callout title="Go Exploring">
                  <div className="flex items-center justify-between gap-4 w-full">
                    <TelescopeIcon className="h-12 w-12 min-w-12 opacity-90 stroke-1 bg-gray-200 rounded-full p-3 border-2 border-gray-300" />
                    <div>
                      Explore an area. Search by location, type of dish,
                      restaurant and more.
                    </div>
                  </div>
                </Callout>
                <Separator className="opacity-100 bg-gray-300" />
                <Callout title="Meet Carmen" moreLink="AI Assistant">
                  <div className="flex items-center justify-between gap-4 w-full">
                    <Avatar className="hidden h-12 w-12 sm:flex border-2 border-gray-400">
                      <AvatarImage src="/carmen.png" alt="Meet Carmen" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div>
                      Carmen is an AI Assistant that helps connect you to
                      restaurants & dishes in your area.
                    </div>
                  </div>
                </Callout>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <Breadcrumb>
        <div className="h-[36px] flex items-center text-sm"></div>
      </Breadcrumb>
      <div className="container mx-auto max-w-[1080px] py-4">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-12">
            <div className="bg-gray-50 relative z-10 p-8">
              <h2>How It Works</h2>
              <Link href="/foobar/explore/boston/restaurant/burger/4">
                Boston
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-[#cbd5e4]/30">
        <div className="grid grid-cols-12 container mx-auto max-w-[1080px] py-4">
          <div className="col-span-12 md:col-span-12">
            <div className=" relative z-10 p-8">
              <h2>Meet Carmen</h2>
              <Link href="/foobar/explore/boston/restaurant/burger/4">
                Boston
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Callout({
  title,
  moreLink = "",
  children,
}: PropsWithChildren<{ title?: React.ReactNode; moreLink?: React.ReactNode }>) {
  return (
    <Card className="max-w-sm h-1/2 border-0 bg-transparent shadow-none pt-1">
      <CardHeader className="px-4 py-0">
        {/* <CardTitle className="text-base">{title}</CardTitle> */}
        <CardDescription className="flex items-center gap-2 text-xs text-primary">
          {children}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 py-0 text-right">
        <Button size="sm" variant="link" className="text-xs text-gray-600 h-6">
          {moreLink || title} <ChevronRightIcon className="w-3 h-3" />
        </Button>
      </CardContent>
    </Card>
  );
}
