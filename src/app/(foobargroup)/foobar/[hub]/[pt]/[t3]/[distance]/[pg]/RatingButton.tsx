"use client";

import { useAuthContext } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { leaveMushroom } from "@/lib/actions";
import { isMushroomPresentByUser } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function RatingButton({
  rating,
  profileId,
  excellenceId,
  // mushroomPromise,
  isAdd,
  userId,
}: any) {
  const pathname = usePathname();
  // const [{ isPresent: isMushroomPresent }, setRatingDetails] = useState(
  //   {
  //     rating: 0,
  //     isPresent: false,
  //   }
  // );
  // console.log(isAdd, "isAdd RatingButton", pathname);
  const [isPending, setIsPending] = useState(false);

  // const isAdd = !isMushroomPresent;

  // useEffect(() => {
  //   async function getData() {
  //     if (!userId) {
  //       return;
  //     }
  //     const data = await isMushroomPresentByUser(
  //       userId,
  //       profileId,
  //       excellenceId
  //     );
  //     setRatingDetails(data);
  //   }
  //   getData();
  // }, [userId]);

  const handleLeaveMushroom = async () => {
    if (!userId) {
      toast(
        <pre className="mt-0  w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Please login to leave a mushroom.</code>
        </pre>
      );
    } else if (userId && profileId && excellenceId) {
      setIsPending(true);
      // console.log("CLIENT", isAdd);
      const { isSuccess, rating: updatedRating } = await leaveMushroom(
        userId,
        profileId,
        excellenceId,
        pathname,
        isAdd
      );

      if (isSuccess) {
        setTimeout(() => fetch("/api/cache?tag=foobar"), 20000);
      }
      // setRatingDetails({
      //   isPresent: !isMushroomPresent,
      //   rating: updatedRating,
      // });
      // setIsPending(false);
      // console.log(updatedRating, "updatedRating", isAdd);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        className="animate-fadeInQuick bg-gray-100 hover:bg-gray-50 text-muted-foreground min-w-24 gap-2 disabled:opacity-100"
        disabled={isPending}
        size={"sm"}
        onClick={handleLeaveMushroom}
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 text-muted-foreground animate-spin relative z-50" />{" "}
          </>
        ) : (
          <>
            {rating} {isAdd ? "Add" : "Remove"}
          </>
        )}
      </Button>
    </div>
  );
}
