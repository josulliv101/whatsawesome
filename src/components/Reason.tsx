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
    <Card className="w-full min-h-[200px]">
      <CardHeader className="grid grid-cols-[1fr] sm:grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          {/* <CardTitle>whats awesome about {name}</CardTitle> */}
          <CardDescription className="text-xl leading-relaxed">
            {description}
          </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button variant="secondary" className="px-0 shadow-none pl-3 flex-1">
            <StarIcon className="mr-2 h-4 w-4 opacity-50" />
            {/* <img
              className="h-6 w-auto grayscale opacity-30"
              src="/cute-mushroom.png"
              alt="whatsawesome"
            /> */}
            <span className="text-muted-foreground px-0">rate</span>
          </Button>
          <Separator orientation="vertical" className="h-[20px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="px-2 shadow-none">
                <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              alignOffset={-5}
              className="w-[200px]"
              forceMount
            >
              <DropdownMenuCheckboxItem>
                {/* <img
                  className="h-4 w-auto  opacity-100"
                  src="/cute-mushroom.png"
                  alt="whatsawesome"
                /> */}
                {[...new Array(1)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="mr-0 h-4 w-4 opacity-100 text-yellow-500 fill-yellow-300"
                  />
                ))}
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem>
                <div className="flex gap-2">
                  {[...new Array(2)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="mr-0 h-4 w-4 opacity-100 text-yellow-500 fill-yellow-300"
                    />
                  ))}
                </div>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                <div className="flex gap-2">
                  {[...new Array(3)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="mr-0 h-4 w-4 opacity-100 text-yellow-500 fill-yellow-300"
                    />
                  ))}
                </div>
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>
                <div className="flex gap-2 items-center opacity-60">
                  <ThumbsDownIcon className="h-4 w-4 relative top-px" />I
                  disagree
                </div>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
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
