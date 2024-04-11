import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { config } from "@/lib/config";
import { Separator } from "./ui/separator";
import { useState } from "react";

export default function MushroomHoverCard({
  mushroomCount = 0,
  peopleCount = 0,
}: {
  mushroomCount?: number;
  peopleCount?: number;
}) {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);
  return (
    <HoverCard open={isOpen}>
      <HoverCardTrigger asChild>
        <Button
          variant={"ghost"}
          onClick={() => {
            toast(
              <pre className="mt-0 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  Functionality not yet implemented.
                </code>
              </pre>
            );
          }}
          onMouseOverCapture={() => {
            setIsOpen(true);
          }}
          onMouseOut={() => setIsOpen(false)}
          className="_flex grayscale_ hover:grayscale-0 gap-2 transition-all duration-500 relative"
        >
          <Image
            alt="vote"
            src={config.logoPath}
            width={16}
            height={16}
            className="opacity-80_"
          />
          <Heart className="w-4 h-4 absolute__ hidden right-[12px] top-[3px] stroke-[0px] text-white fill-gray-300 opacity-100" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="w-[200px] px-4">
        <div className="flex items-center justify-between gap-8">
          <Image
            alt="vote"
            src={config.logoPath}
            width={48}
            height={48}
            className="opacity-80 hidden"
          />
          {/* <Separator className="h-10 mx-6" orientation="vertical" /> */}
          <p>Support this item by adding a mushroom.</p>
          {/* <Button size="sm">Add</Button> */}
        </div>
        <div className="flex justify-end"></div>
      </HoverCardContent>
    </HoverCard>
  );
}
