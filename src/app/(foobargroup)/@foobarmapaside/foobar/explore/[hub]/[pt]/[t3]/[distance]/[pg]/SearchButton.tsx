"use client";

import useSidebarStore from "@/app/(foobargroup)/useSidebarStore";
import SearchOptionsIcon from "@/app/icons/SearchOptions";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export default function SearchButton() {
  const { updateActiveId } = useSidebarStore();
  return (
    <Button
      size="icon"
      variant={"ghost"}
      onClick={() => updateActiveId("explore")}
    >
      <SearchOptionsIcon className="w-4 h-4 text-gray-500 stroke-0" />
    </Button>
  );
}
