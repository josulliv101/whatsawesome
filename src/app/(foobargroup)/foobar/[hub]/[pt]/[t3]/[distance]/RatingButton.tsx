"use client";

import { useAuthContext } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { leaveMushroom } from "@/lib/actions";
import { isMushroomPresentByUser } from "@/lib/firebase";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function RatingButton({
  // rating,
  profileId,
  excellenceId,
  // mushroomPromise,
  // isAdd,
  // userId,
}: any) {
  const { id: userId = "" } = useAuthContext() || {};
  const [{ isPresent: isMushroomPresent, rating }, setRatingDetails] = useState(
    {
      rating: 0,
      isPresent: false,
    }
  );
  const isAdd = !isMushroomPresent;

  useEffect(() => {
    async function getData() {
      if (!userId) {
        return;
      }
      const data = await isMushroomPresentByUser(
        userId,
        profileId,
        excellenceId
      );
      setRatingDetails(data);
    }
    getData();
  }, [userId]);

  console.log("RatingButton..", excellenceId, isAdd);
  console.log("MushroomButton user", isAdd, excellenceId, profileId);

  const handleLeaveMushroom = async () => {
    if (!userId) {
      toast(
        <pre className="mt-0  w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Please login to leave a mushroom.</code>
        </pre>
      );
    } else if (userId && profileId && excellenceId) {
      const { rating: updatedRating } = await leaveMushroom(
        userId,
        profileId,
        excellenceId,
        isAdd
      );
      setRatingDetails({
        isPresent: !isMushroomPresent,
        rating: updatedRating,
      });
      console.log(updatedRating, "updatedRating");
    }
  };

  return (
    <Button size={"sm"} onClick={handleLeaveMushroom}>
      {rating} {isAdd ? "Add" : "Remove"}
    </Button>
  );
}
