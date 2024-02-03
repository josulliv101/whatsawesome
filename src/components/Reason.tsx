import {
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarIcon,
} from "@radix-ui/react-icons";

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
}: {
  description: string;
  name: string;
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
          <Button variant="secondary" className="px-3 shadow-none pl-6 flex-1">
            {/* <StarIcon className="mr-2 h-4 w-4" /> */}
            <img
              className="h-6 w-auto grayscale opacity-30"
              src="/cute-mushroom.png"
              alt="whatsawesome"
            />
            <span className="text-muted-foreground px-2.5">vote</span>
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
                <img
                  className="h-4 w-auto  opacity-100"
                  src="/cute-mushroom.png"
                  alt="whatsawesome"
                />
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>
                <div className="flex gap-2">
                  <img
                    className="h-4 w-auto  opacity-100"
                    src="/cute-mushroom.png"
                    alt="whatsawesome"
                  />
                  <img
                    className="h-4 w-auto  opacity-100"
                    src="/cute-mushroom.png"
                    alt="whatsawesome"
                  />
                </div>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                <div className="flex gap-2">
                  <img
                    className="h-4 w-auto  opacity-100"
                    src="/cute-mushroom.png"
                    alt="whatsawesome"
                  />
                  <img
                    className="h-4 w-auto  opacity-100"
                    src="/cute-mushroom.png"
                    alt="whatsawesome"
                  />
                  <img
                    className="h-4 w-auto  opacity-100"
                    src="/cute-mushroom.png"
                    alt="whatsawesome"
                  />
                </div>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            TypeScript
          </div>
          <div className="flex items-center">
            <StarIcon className="mr-1 h-3 w-3" />
            20k
          </div>
          <div>created April 2023 by @josulliv101</div>
        </div>
      </CardContent>
    </Card>
  );
}
