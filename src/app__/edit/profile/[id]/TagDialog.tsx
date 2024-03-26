"use client";

import MultipleSelector from "@/components/MultipleSelector";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateReasonTag } from "@/lib/firebase";
import { useState } from "react";

export default function TagDialog({
  profileId,
  reasonId,
  options,
  tags = [],
}: any) {
  const [stateTags, setStateTags] = useState(tags);
  console.log("stateTags", stateTags);

  const handleUpdateTags = async () => {
    await updateReasonTag(profileId, reasonId, stateTags);
  };
  return (
    <Dialog onOpenChange={() => ""}>
      <DialogTrigger asChild>
        <Button variant="outline" className="min-w-[100px]">
          {stateTags.join(" / ")}
          {stateTags.length === 0 && "<no tags>"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Tags</DialogTitle>
          <DialogDescription>Update tag</DialogDescription>
        </DialogHeader>
        <MultipleSelector
          onChange={(tags) => {
            setStateTags(tags.map((item) => item.value));
          }}
          defaultOptions={options}
          value={(stateTags as unknown as string[]).map((tag) => ({
            label: tag,
            value: tag,
          }))}
          placeholder="Add tags..."
          creatable
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
        />
        <DialogFooter>
          <Button onClick={() => handleUpdateTags()}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
