"use client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { config } from "@/lib/config";
import { Profile } from "@/lib/profile";
import { GlobeIcon } from "lucide-react";

export default function TabNav({
  activeTabId,
  hub,
  profile,
  className = "",
}: {
  activeTabId: string;
  className?: string;
  hub: string;
  profile?: Profile;
}) {
  return (
    <Tabs
      value={activeTabId}
      activationMode="manual"
      className={`border border-gray-200 h-full space-y-6 ${className}`}
    >
      <div className="space-between flex items-center h-12">
        <TabsList className="h-12 px-0.5">
          <TabsTrigger value="person" className="h-11 px-4 text-sm">
            <Link href={`/${hub}/person`} className="relative">
              People
            </Link>
          </TabsTrigger>
          <TabsTrigger value="place" className="h-11 px-4 text-sm">
            <Link href={`/${hub}/place`} className="relative">
              Places
            </Link>
          </TabsTrigger>
          {profile && (
            <TabsTrigger value="profile" className="h-11 px-4 text-sm">
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
