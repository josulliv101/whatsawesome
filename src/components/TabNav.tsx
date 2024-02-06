"use client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { config } from "@/lib/config";
import { Profile } from "@/lib/profile";
import { GlobeIcon } from "lucide-react";
import { useTabIndicator } from "./useTabIndicator";
import { number } from "zod";

const tabNames: Record<string, number> = {
  person: 0,
  place: 1,
  profile: 2,
};

export default function TabNav({
  activeTabId: initialActiveTabId,
  hub,
  profile,
  className = "",
}: {
  activeTabId: string;
  className?: string;
  hub: string;
  profile?: Profile;
}) {
  const [activeTabId, setActiveTabId] = useState(initialActiveTabId);
  const refTab1 = useRef<HTMLButtonElement>(null);
  const refTab2 = useRef<HTMLButtonElement>(null);
  const refTab3 = useRef<HTMLButtonElement>(null);

  const style = useTabIndicator(
    tabNames[activeTabId],
    refTab1,
    refTab2,
    refTab3
  );
  console.log("style", style);
  return (
    <Tabs
      value={activeTabId}
      onValueChange={(val) => {
        setActiveTabId(val);
        console.log(val);
      }}
      activationMode="manual"
      className={`border border-gray-200 h-full space-y-6 ${className}`}
    >
      <div className="space-between flex items-center h-12">
        <TabsList className="h-12 px-0.5">
          <div
            className="__tab-indicator relative h-1 -z-0 rounded-sm bg-background"
            style={style}
          ></div>
          <TabsTrigger
            ref={refTab1}
            value="person"
            className="relative z-0 h-11 px-4 text-sm"
          >
            <Link href={`/${hub}/person`} className="relative">
              People
            </Link>
          </TabsTrigger>
          <TabsTrigger
            ref={refTab2}
            value="place"
            className="relative z-0 h-11 px-4 text-sm"
          >
            <Link href={`/${hub}/place`} className="relative">
              Places
            </Link>
          </TabsTrigger>
          {profile && (
            <TabsTrigger
              ref={refTab3}
              value="profile"
              className="relative z-0 h-11 px-4 text-sm"
            >
              <Link
                href={`/${hub}/profile`}
                className="relative flex items-center gap-1"
              >
                <GlobeIcon className="h-3.5 w-3.5 text-gray-400" />
                {hub}
                <Image
                  className={`hidden grayscale opacity-70`}
                  alt="vote"
                  src="/cute-mushroom.png"
                  width={16}
                  height={16}
                />
              </Link>
            </TabsTrigger>
          )}
          {/* <TabsTrigger value="company">
            <Link href={`/${hub}/company`} className="relative">
              Companies
            </Link>
          </TabsTrigger> */}
        </TabsList>
      </div>
    </Tabs>
  );
}
