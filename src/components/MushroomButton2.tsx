"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Heart, Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { config } from "@/lib/config";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { leaveMushroom } from "@/lib/actions";

export default function MushroomButton2({
  initialIsPending = false,
  isLeaveMushroom = true,
  profileId,
  excellenceId,
  userId,
  cacheTag,
  rank,
}: any) {
  const isRemoveMushroom = !isLeaveMushroom;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, setIsPending] = useState(initialIsPending);
  const [isTransitionToIcon, setIsTransitionToIcon] = useState(false);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShowHeart, setIsShowHeart] = useState(isRemoveMushroom);

  useEffect(() => {
    if (isLeaveMushroom) {
      setIsPending(false);
      setIsUpdatingOrder(false);
      setIsTransitionToIcon(false);
    }
    if (!isLeaveMushroom) {
      setIsPending(false);
      setIsUpdatingOrder(false);
      setIsTransitionToIcon(false);
      // setTimeout(() => setIsShowHeart(true), 3900);
    }
  }, [isLeaveMushroom]);

  useEffect(() => {
    if (isPending) {
      setTimeout(() => setIsTransitionToIcon(true), isLeaveMushroom ? 0 : 0);
      setTimeout(() => setIsUpdatingOrder(true), 600);
      // setTimeout(() => setIsSuccess(true), 3000);
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
          console.log("call endpoint to revalidate tag", cacheTag);
          await fetch(`/api/cache?tag=${cacheTag}`);
          router.refresh();
        }, 4000);
      }
    }
  };
  return (
    <Button
      variant={"ghost"}
      onClick={handleLeaveMushroom}
      size="sm"
      className={cn(
        "relative transition-all duration-500 gap-2 text-muted-foreground",
        (isLeaveMushroom && isTransitionToIcon) ||
          (isRemoveMushroom && !isTransitionToIcon && !isPending)
          ? "w-12"
          : "w-40",
        isPending ? "bg-muted hover:bg-muted" : "bg-transparent",
        isRemoveMushroom ? "border-transparent" : ""
      )}
    >
      {!isSuccess && isLeaveMushroom && !isPending && "Leave a mushroom"}
      {!isSuccess && isPending && isLeaveMushroom && (
        <span
          className={cn(
            "absolute -left-4 -translate-x-full transition-opacity delay-1000 duration-500",
            isTransitionToIcon ? "opacity-100" : "opacity-0",
            isSuccess ? "border-0" : ""
          )}
        >
          {true && (
            <span className="animate-fadeInQuick font-normal text-gray-400 flex items-center gap-2">
              {/* <Loader2Icon className="h-3 w-3 animate-spin text-gray-500 opacity-40" />{" "} */}
              Saving
            </span>
          )}
        </span>
      )}
      {isPending && !isUpdatingOrder && isLeaveMushroom && (
        <Loader2Icon className="h-4 w-4 animate-spin text-blue-500 opacity-80" />
      )}
      {isRemoveMushroom && isTransitionToIcon && (
        <Loader2Icon className="h-4 w-4 animate-spin text-blue-500 opacity-80" />
      )}
      {((isUpdatingOrder && isLeaveMushroom) || isRemoveMushroom) && (
        <div className="animate-fadeInAndScale origin-bottom flex flex-col items-center">
          <img
            className={cn(
              "relative top-0.5 w-6 h-6 origin-bottom",
              isLeaveMushroom ? "animate-mushroomButton" : "",
              isRemoveMushroom && isTransitionToIcon ? "hidden" : "block"
            )}
            src={"/cute-mushroom-no-shadow.png"}
            alt="whatsawesome"
            onAnimationEnd={(ev) => {
              setIsShowHeart(true);
              // setIsPending(false);
            }}
          />
          {isRemoveMushroom && isTransitionToIcon ? null : (
            <div className="animate-rubberBandJumpShadow__ bg-black dark:bg-blue-700/90 h-[2px] w-[22px] origin-bottom rounded-full " />
          )}
        </div>
      )}
      {
        <Heart
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-500 animate-fadeIn absolute right-[7px] top-[0px] stroke-[2.5px] text-white fill-red-500",
            isRemoveMushroom && isShowHeart && !isPending
              ? "scale-100"
              : "scale-0"
          )}
        />
      }
      <div className="absolute -top-8 hidden">
        {isPending ? "is Pending" : "not Pending"}
      </div>
    </Button>
  );
}
