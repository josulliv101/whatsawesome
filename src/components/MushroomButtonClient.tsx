"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { config } from "@/lib/config";
import { leaveMushroom } from "@/lib/actions";
import { toast } from "sonner";

export default function MushroomButtonClient({
  userId,
  profileId,
  excellenceId,
  isMushroomPresent,
}: any) {
  const handleLeaveMushroom = async () => {
    if (!userId) {
      toast(
        <pre className="mt-0  w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Please login to leave a mushroom.</code>
        </pre>
      );
    } else if (userId && profileId && excellenceId) {
      const foo = await leaveMushroom(
        userId,
        profileId,
        excellenceId,
        !isMushroomPresent
      );
      console.log(foo);
    }
  };
  return (
    <Button
      onClick={handleLeaveMushroom}
      variant={"ghost"}
      className="group/btn text-sm absolute top-2 right-2 flex bg-muted_ rounded-md items-center px-0_ py-4_ gap-2 min-w-[80px] transition-all duration-500 text-muted-foreground"
    >
      <Image
        alt="vote"
        src={config.logoPath}
        width={24}
        height={24}
        className="opacity-0 group-hover/btn:opacity-100 transition-all duration-500 mr-1"
      />
      {isMushroomPresent ? "Take Back" : "Leave"} Mushroom
    </Button>
  );
}
