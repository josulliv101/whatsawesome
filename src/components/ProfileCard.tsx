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
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={profile.pic}
          alt={profile.name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto max-h-[220px] overflow-hidden object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{profile.name}</h3>
        <p className="text-xs text-muted-foreground">{profile.description}</p>
      </div>
    </div>
  );
}
