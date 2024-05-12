"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { config } from "@/lib/config";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { leaveMushroom } from "@/lib/actions";

export default function MushroomButton({
  initialIsPending = false,
  isLeaveMushroom = true,
  profileId,
  excellenceId,
  userId,
  cacheTag,
}: any) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, setIsPending] = useState(initialIsPending);
  const [isTransitionToIcon, setIsTransitionToIcon] = useState(false);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isPending) {
      setTimeout(() => setIsTransitionToIcon(true), 0);
      setTimeout(() => setIsUpdatingOrder(true), 2000);
      setTimeout(() => setIsSuccess(true), 3000);
    }
  }, [isPending]);

  const handleLeaveMushroom = async () => {
    if (!userId) {
      toast(
        <pre className="mt-0  w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Please login to leave a mushroom.</code>
        </pre>
      );
    } else if (userId && profileId && excellenceId) {
      setIsPending(true);
      // setTimeout(() => setIsRecalculatingOrder(true), 2200);
      // console.log("CLIENT", isAdd);
      const { isSuccess: isLeaveMushroomSuccess, rating: updatedRating } =
        await leaveMushroom(
          userId,
          profileId,
          excellenceId,
          pathname,
          isLeaveMushroom
        );

      if (isLeaveMushroomSuccess) {
        setTimeout(async () => {
          await fetch(`/api/cache?tag=${cacheTag}`);
          router.refresh();
        }, 3000);
      }
      // setRatingDetails({
      //   isPresent: !isMushroomPresent,
      //   rating: updatedRating,
      // });
      // setIsPending(false);
      // console.log(updatedRating, "updatedRating", isAdd);
    }
  };

  if (!isLeaveMushroom) {
    return <Button onClick={handleLeaveMushroom}>remove</Button>;
  }

  return (
    <Button
      variant={"outline"}
      onClick={handleLeaveMushroom}
      size="sm"
      className={cn(
        "relative transition-all duration-500 gap-2 text-muted-foreground",
        isTransitionToIcon ? "w-12" : "w-44"
      )}
    >
      {!isSuccess && isLeaveMushroom && !isPending && "Leave a mushroom"}
      {!isSuccess && isLeaveMushroom && isPending && (
        <span
          className={cn(
            "absolute -left-4 -translate-x-full transition-opacity delay-1000 duration-500",
            isTransitionToIcon ? "opacity-100" : "opacity-0",
            isSuccess ? "border-0" : ""
          )}
        >
          {!isUpdatingOrder && (
            <span className="animate-fadeInDelayed font-normal">Saving</span>
          )}
          {isUpdatingOrder && (
            <span className="animate-fadeIn font-normal">
              Updating rankings
            </span>
          )}
          {/* <span
            className={cn(
              "delay-[2000ms]",
              isTransitionToIcon ? "opacity-100" : "opacity-0"
            )}
          >
            Updating rankings
          </span> */}
        </span>
      )}
      {isPending && !isSuccess && (
        <Loader2Icon className="h-4 w-4 animate-spin text-blue-500 opacity-80" />
      )}
      {isSuccess && (
        <div className="animate-fadeInQuick">
          <img
            className="w-6 h-6 animate-rubberBandJumpNoDelay2 "
            src={config.logoPath}
            width="24"
            height="24"
          />
        </div>
      )}
    </Button>
  );
}
