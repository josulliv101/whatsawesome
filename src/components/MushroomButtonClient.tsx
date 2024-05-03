"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { config } from "@/lib/config";
import { leaveMushroom } from "@/lib/actions";
import { toast } from "sonner";
import { useEffect, useState, useTransition } from "react";
import { cn } from "@/lib/utils";

export default function MushroomButtonClient({
  userId,
  profileId,
  excellenceId,
  isMushroomPresent,
}: any) {
  const [isActive, setIsActive] = useState(false);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setIsActive(false);
  }, [isMushroomPresent]);

  const handleLeaveMushroom = async () => {
    if (!userId) {
      toast(
        <pre className="mt-0  w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Please login to leave a mushroom.</code>
        </pre>
      );
    } else if (userId && profileId && excellenceId) {
      setIsActive(true);
      const { rating } = await leaveMushroom(
        userId,
        profileId,
        excellenceId,
        !isMushroomPresent
      );
      console.log(rating, "rating");
    }
  };
  return (
    <>
      <Button
        onClick={handleLeaveMushroom}
        variant={"ghost"}
        className="group/btn min-w-[60px] text-sm absolute top-2 right-2 flex bg-muted_ rounded-md items-center px-0_ py-4_ gap-2  transition-all duration-500 text-muted-foreground"
      >
        {isMushroomPresent || isActive ? (
          <Image
            alt="vote"
            src={config.logoPath}
            width={24}
            height={24}
            className={cn(
              `_group-hover/btn:opacity-100 origin-bottom mx-1`,
              isActive || isMushroomPresent ? "opacity-100" : "opacity-0",
              isActive ? "animate-rubberBandJumpNoDelay" : ""
            )}
          />
        ) : (
          "Leave Mushroom"
        )}
      </Button>
    </>
  );
}
