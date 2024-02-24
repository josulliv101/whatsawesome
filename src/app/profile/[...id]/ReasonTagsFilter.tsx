"use client";

import { Button } from "@/components/ui/button";
import { PropsWithChildren, useEffect } from "react";
import useReasonVisibilityStore from "./useReasonVisibilityStore";
import { Reason } from "@/lib/profile";

export default function ReasonTagsFilter({
  tags = [],
}: PropsWithChildren<{ tags: string[] }>) {
  const { clearActiveTags, updateActiveTags, activeTags } =
    useReasonVisibilityStore();

  useEffect(() => {
    clearActiveTags();
  }, []);

  const updateTag = (tag: string) => {
    if (activeTags.includes(tag)) {
      clearActiveTags();
    } else {
      updateActiveTags(tag);
    }
  };

  console.log("activeTags", activeTags);
  return (
    <div className="flex items-center gap-4 py-8">
      {["all"].concat(tags).map((tag) => (
        <Button
          key={tag}
          onClick={() => updateTag(tag)}
          size="sm"
          variant={"secondary"}
          className={`border-2 ${activeTags.includes(tag) ? "border-gray-400" : "border-gray-200"}`}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}
