"use client";

import { Button } from "@/components/ui/button";
import { PropsWithChildren, useEffect } from "react";
import useReasonVisibilityStore from "./useReasonVisibilityStore";
import { Reason } from "@/lib/profile";
import { useRouter } from "next/navigation";
import { CheckIcon } from "lucide-react";

export default function ReasonTagsFilter({
  tags = [],
}: PropsWithChildren<{ tags: string[] }>) {
  const router = useRouter();
  const { clearActiveTags, updateActiveTags, activeTags } =
    useReasonVisibilityStore();

  useEffect(() => {
    clearActiveTags();
  }, []);

  const updateTag = (tag: string) => {
    if (activeTags.includes(tag)) {
      clearActiveTags();
      router.replace(`?filter=all`, { scroll: false });
    } else {
      router.replace(`?filter=${tag}`, { scroll: false });
      updateActiveTags(tag);
    }
  };

  console.log("activeTags", activeTags);
  return (
    <div className="flex w-full items-center justify-end gap-4 py-0 shrink">
      {["all"].concat(tags).map((tag) => (
        <Button
          key={tag}
          onClick={() => updateTag(tag)}
          size="sm"
          variant={"secondary"}
          className={`relative border-2 ${activeTags.includes(tag) ? "border-gray-400" : "border-gray-200"}`}
        >
          {(activeTags.includes(tag) ||
            (!activeTags.length && tag === "all")) && (
            <div className="h-4 w-4 bg-gray-700 absolute -top-2 -right-1 rounded-full flex items-center justify-center">
              <CheckIcon className="h-4 w-4 p-0.5 text-white" />
            </div>
          )}
          {tag}
        </Button>
      ))}
    </div>
  );
}
