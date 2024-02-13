import {
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarFilledIcon as StarIcon,
} from "@radix-ui/react-icons";
import { ThumbsDownIcon, NetworkIcon } from "lucide-react";
import Image from "next/image";
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
  photoUrl,
}: {
  description: string;
  name: string;
  rating: number;
  photoUrl?: string;
}) {
  return (
    <Card className="w-full min-h-[20px] flex flex-col md:flex-row items-center gap-4 py-0 ">
      {photoUrl && (
        <div className="bg-blue-800 w-full md:w-auto">
          <Image
            className="grayscale__ hover:grayscale-0__ object-cover w-full h-full max-h-[300px] max-w-full block min-w-full md:h-[135px] md:max-w-[135px] md:w-auto min-h-full md:min-w-[200px] overflow-hidden opacity-80"
            width="180"
            height="135"
            src={photoUrl}
            alt=""
          />
        </div>
      )}
      <CardHeader className="flex-1 px-6 pt-4 pb-2 grid grid-cols-[1fr] items-start gap-0s space-y-0">
        <div className="space-y-1">
          {/* <CardTitle>whats awesome about {name}</CardTitle> */}
          <CardDescription className="text-xl leading-relaxed">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-1">
        <div className="flex space-x-6 text-sm text-muted-foreground">
          {/* <div className="flex items-center">
            <img
              className="h-4 w-auto  opacity-100 pr-1.5"
              src="/cute-mushroom.png"
              alt="whatsawesome"
            />
            {rating} rating
          </div> */}
          <div className="flex items-center w-20">
            <StarIcon className="mr-1 h-3 w-3 text-yellow-500" />
            {rating} rating
          </div>
          <div className="w-44 whitespace-nowrap md:whitespace-normal">
            created April 2023 by @josulliv101
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
