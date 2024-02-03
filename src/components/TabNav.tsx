"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { config } from "@/lib/config";

export default function TabNav({
  activeTabId,
  hub,
  className = "",
}: {
  activeTabId: string;
  className?: string;
  hub: string;
}) {
  return (
    <Tabs value={activeTabId} className={`h-full space-y-6 ${className}`}>
      <div className="space-between flex items-center">
        <TabsList>
          <TabsTrigger value="person">
            <Link href={`/${hub}/person`} className="relative">
              People
            </Link>
          </TabsTrigger>
          <TabsTrigger value="place">
            <Link href={`/${hub}/place`} className="relative">
              Places
            </Link>
          </TabsTrigger>
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
