"use client";

import useSidebarStore from "@/app/(foobargroup)/useSidebarStore";
import { Button } from "@/components/ui/button";
import { TelescopeIcon } from "lucide-react";
import Image from "next/image";

const options: Array<[string, any, string]> = [
  ["Go Exploring", TelescopeIcon, "explore"],
  ["AI Assistant", null, "ai-assistant"],
]; // , "Filter", "more"
export default function MenuUserOptions() {
  const { updateActiveId } = useSidebarStore();
  return (
    <div className="grid grid-cols-12 gap-2 text-sm text-muted-foreground_">
      {options.map(([label, Component, id], index) => {
        return (
          <Button
            key={id}
            variant={"outline"}
            onClick={() => updateActiveId(id)}
            className="text-xs bg-gray-100 gap-2 border-gray-300 col-span-6 flex items-center justify-center p-2 rounded-md min-h-16 "
          >
            {index === -1 && (
              <TelescopeIcon className="h-5 w-5 mr-2 text-gray-500 opacity-80_" />
            )}
            {index === 1 && (
              <Image
                className="w-10 h-10 rounded-full border-2 border-gray-400"
                width="120"
                height="120"
                src="/carmen.png"
                alt="Carmen"
              />
            )}

            {label}
          </Button>
        );
      })}
    </div>
  );
}
