"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HomeIcon } from "lucide-react";
import { PropsWithChildren } from "react";

export default function ResetMapPosition({
  position,
  onReset,
  children,
}: PropsWithChildren<any>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant={"default"}
          onClick={onReset}
          className="animate-fadeInQuick absolute top-4 left-4 text-white rounded-full w-[34px] h-[34px]"
        >
          <HomeIcon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent>
          <p>Reset to initial marker positions {children}</p>
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
}
