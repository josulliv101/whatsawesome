import {
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarFilledIcon as StarIcon,
} from "@radix-ui/react-icons";
import {
  ThumbsDownIcon,
  NetworkIcon,
  BarChart3Icon,
  BarChart2Icon,
  BarChartIcon,
} from "lucide-react";
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
import RateReason from "./RateReason";
import { AnalyticsDialog } from "./AnalyticsDialog";

export function Reason({
  id,
  description,
  name,
  rating,
  photoUrl,
  profileId,
  userRating,
  ratings,
}: {
  id?: string;
  description: string;
  name: string;
  rating: number;
  photoUrl?: string;
  profileId: string;
  userRating?: number;
  ratings?: Record<string, number>;
}) {
  return (
    <Card className="relative w-full min-h-[222px] flex flex-col md:flex-row items-center gap-0 py-0 ">
      {photoUrl && (
        <div className="bg-blue-800 w-full md:w-auto">
          <Image
            className="grayscale__ hover:grayscale-0__ object-cover w-full h-full max-h-[300px] max-w-full block min-w-full md:h-[220px] md:max-w-[220px] md:w-auto min-h-full md:min-w-[220px] overflow-hidden opacity-80"
            width="180"
            height="135"
            src={photoUrl}
            alt=""
          />
        </div>
      )}
      <CardHeader className="flex-1 px-16 pt-4 pb-2 grid grid-cols-[1fr] items-start gap-0s space-y-0">
        <div className="space-y-1">
          {/* <CardTitle>whats awesome about {name}</CardTitle> */}
          <CardDescription className="text-xl lg:text-2xl leading-relaxed first-letter:text-4xl first-letter:pr-0.5 fir lg:leading-[2.25rem]">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-1">
        <div className="flex__ hidden space-x-6 text-sm text-muted-foreground">
          {/* <div className="flex items-center">
            <img
              className="h-4 w-auto  opacity-100 pr-1.5"
              src="/cute-mushroom.png"
              alt="whatsawesome"
            />
            {rating} rating
          </div> */}
          <div className="hidden flex__ items-center w-20">
            <StarIcon className="mr-1 h-3 w-3 text-yellow-500" />
            {rating} rating
          </div>
          <div className="w-44 whitespace-nowrap md:whitespace-normal">
            created by @josulliv101
          </div>
        </div>
        <div className="absolute top-2 right-2">
          {id && (
            <RateReason
              profileId={profileId}
              reasonId={id}
              userRating={userRating}
            />
          )}
        </div>
        <div className="hidden absolute bottom-1 left-[250px]">
          <AnalyticsDialog ratings={ratings} description={description} />
        </div>

        {/* <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <BarChartIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            Analytics
          </div>
          <div className="hidden _flex items-center">
            <StarIcon className="mr-1 h-3 w-3" />
            20k
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}
