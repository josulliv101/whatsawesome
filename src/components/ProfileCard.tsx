import Link from "next/link";
import NavMenu from "./NavMenu";
import Image from "next/image";
import { ThumbsDownIcon, Globe as NetworkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import Rating from "./Rating";
import { Profile } from "@/lib/profile";
import { tags } from "@/lib/tags";

interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  profile: Profile;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export default function ProfileCard({
  profile,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ProfileCardProps) {
  console.log("profile card!!", profile);
  return (
    <Link href={`/profile/${profile.id}`}>
      <div className={cn("space-y-4", className)} {...props}>
        <div className="relative overflow-hidden rounded-md bg-blue-500">
          <Image
            priority
            src={profile.pic}
            alt={profile.name}
            width={width}
            height={height}
            className={cn(
              "h-auto w-auto__ opacity-80 max-h-[200px] overflow-hidden object-cover transition-all scale-100 duration-300 hover:scale-105",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
          />
          {false && (
            <div className="absolute top-2 right-2 flex items-center justify-center rounded-full h-6 w-6 bg-black border-0 border-white shadow-\">
              <NetworkIcon className="h-3.5 w-3.5 text-white" />
            </div>
          )}
        </div>
        <div className="hidden space-y-1 text-sm mb-1">
          <div className="flex flex-col align-end justify-end text-sm text-muted-foreground leading-normal border-0 px-0 py-1">
            {/* <p className="flex items-center justify-between gap-2 mb-2">
            <Badge variant={"outline"}>
              <img
                src="/cute-mushroom.png"
                width="14"
                height="12"
                className="inline-flex justify-start relative mr-1 mb-0 object-cover text-gray-500"
              />
              121
            </Badge>
            <span className="flex items-center text-black text-xs">
              <CircleUserIcon className="w-auto h-4 text-black mr-1" /> 121
              followers
            </span>
          </p> */}
          </div>
        </div>
        <h3 className="relative font-medium leading-normal pb-2 text-sm text-center text-balance">
          {profile.name}
          <Rating value={profile.oinks} />
        </h3>
      </div>
    </Link>
  );
}
