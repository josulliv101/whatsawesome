import {
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarFilledIcon as StarIcon,
} from "@radix-ui/react-icons";
import { ThumbsDownIcon, NetworkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export function Reason({
  description,
  name,
  rating,
}: {
  description: string;
  name: string;
  rating: number;
}) {
  return (
    <Card className="w-full min-h-[20px]">
      <CardHeader className="px-6 pt-4 pb-2 grid grid-cols-[1fr] items-start gap-0s space-y-0">
        <div className="space-y-1">
          {/* <CardTitle>whats awesome about {name}</CardTitle> */}
          <CardDescription className="text-xl leading-relaxed">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-1">
        <div className="flex space-x-4 text-sm text-muted-foreground">
          {/* <div className="flex items-center">
            <img
              className="h-4 w-auto  opacity-100 pr-1.5"
              src="/cute-mushroom.png"
              alt="whatsawesome"
            />
            {rating} rating
          </div> */}
          <div className="flex items-center">
            <StarIcon className="mr-1 h-3 w-3 text-yellow-500" />
            {rating} rating
          </div>
          <div>created April 2023 by @josulliv101</div>
        </div>
      </CardContent>
    </Card>
  );
}
