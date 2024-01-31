import Link from "next/link";
import NavMenu from "./NavMenu";

interface Profile {
  name: string;
  description: string;
  pic: string;
}

// export default function ProfileCard({ name, description, pic }: Profile) {
//   return (
//     <div>
//       <h2 className="flex items-center text-xl lg:text-4xl font-semibold tracking-tight mb-1">
//         {name}
//       </h2>
//       {description && (
//         <p className="text-md lg:text-lg text-muted-foreground mb-12">
//           {description}
//         </p>
//       )}
//     </div>
//   );
// }

import Image from "next/image";
import { CircleUserIcon } from "lucide-react";
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
  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="overflow-hidden rounded-md bg-blue-500">
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
      <h3 className="font-medium leading-normal pb-2 text-sm text-center text-balance">
        {profile.name}
      </h3>
    </div>
  );
}
