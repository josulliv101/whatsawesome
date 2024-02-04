"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { config } from "@/lib/config";
import { Profile } from "@/lib/profile";

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
          {/* {profile && (
            <TabsTrigger value={profile.id}>
              <Link href={`/${hub}/company`} className="relative">
                {profile.name} Profile
              </Link>
            </TabsTrigger>
          )} */}
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
