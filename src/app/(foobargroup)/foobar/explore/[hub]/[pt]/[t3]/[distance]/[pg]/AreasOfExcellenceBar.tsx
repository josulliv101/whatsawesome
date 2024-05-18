import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import {
  BadgeCheckIcon,
  CircleHelpIcon,
  MessageCircleQuestionIcon,
} from "lucide-react";
import Link from "next/link";

export default function AreasOfExcellenceBar({ areaOfExcellence }: any) {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        // "w-full",
        "relative",
        "mx-0 mt-4 bg-muted px-4 py-2 rounded-md",
        "text-lg text-muted-foreground"
      )}
    >
      <div className="flex place-items-center">
        <BadgeCheckIcon className="h-5 w-5 mr-2 text-blue-500 opacity-80" />
        <strong className="font-[500] capitalize">{areaOfExcellence}</strong>
      </div>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            size="sm"
            variant={"ghost"}
            className="text-muted-foreground ml-2 gap-2"
          >
            <CircleHelpIcon className="w-4 h-4 text-blue-500" />
            Endorse an item below by leaving a mushroom.{" "}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="w-96">
          explain here
        </HoverCardContent>
      </HoverCard>

      {/* <ReasonTagsFilter tags={uniqueReasonTags} /> */}
    </div>
  );
}
