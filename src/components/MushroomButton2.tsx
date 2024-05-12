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
}: any) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, setIsPending] = useState(initialIsPending);
  const [isTransitionToIcon, setIsTransitionToIcon] = useState(false);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShowHeart, setIsShowHeart] = useState(false);

  useEffect(() => {
    if (isPending) {
      setTimeout(() => setIsTransitionToIcon(true), 0);
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
        }, 3500);
      }
      // setRatingDetails({
      //   isPresent: !isMushroomPresent,
      //   rating: updatedRating,
      // });
      // setIsPending(false);
      // console.log(updatedRating, "updatedRating", isAdd);
    }
  };

  // if (!isLeaveMushroom) {
  //   return <Button onClick={handleLeaveMushroom}>remove</Button>;
  // }

  return (
    <Button
      variant={"outline"}
      onClick={handleLeaveMushroom}
      size="sm"
      className={cn(
        "relative transition-all duration-500 gap-2 text-muted-foreground",
        isTransitionToIcon || !isLeaveMushroom ? "w-12" : "w-44",
        isLeaveMushroom ? "" : "border-transparent bg-transparent"
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
          {/* {!isUpdatingOrder && (
            <span className="animate-fadeInDelayed font-normal">Saving</span>
          )} */}
          {true && (
            <span className="animate-fadeInQuick font-normal text-gray-400 flex items-center gap-2">
              <Loader2Icon className="h-3 w-3 animate-spin text-gray-500 opacity-40" />{" "}
              Saving
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
      {isPending && !isUpdatingOrder && isLeaveMushroom && (
        <Loader2Icon className="h-4 w-4 animate-spin text-blue-500 opacity-80" />
      )}
      {/* animate-rubberBandJumpNoDelay2 */}
      {((isUpdatingOrder && isLeaveMushroom) || !isLeaveMushroom) && (
        <div className="animate-fadeInAndScale origin-bottom flex flex-col items-center">
          {/* <img
            className={cn(
              "w-6 h-6",
              "animate-mushroomButton"
              // "transition-all duration-300",
              // isUpdatingOrder ? "opacity-100" : "opacity-0"
            )}
            src={config.logoPath}
            width="24"
            height="24"
          /> */}
          <img
            // ref={refLogo}
            className={`relative top-0.5 w-6 h-6 origin-bottom animate-mushroomButton`}
            src={"/cute-mushroom-no-shadow.png"}
            alt="whatsawesome"
            onAnimationEnd={(ev) => {
              setIsShowHeart(true);
            }}
          />
          <div className="animate-rubberBandJumpShadow__ bg-black dark:bg-blue-700/90 h-[2px] w-[22px] origin-bottom rounded-full " />
        </div>
      )}
      {!isLeaveMushroom && isShowHeart && (
        <Heart
          className={cn(
            "w-3.5 h-3.5 animate-fadeIn absolute right-[7px] top-[0px] stroke-[2.5px] text-white fill-red-500"
            // "transition duration-300",
            // isShowHeart ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </Button>
  );
}
