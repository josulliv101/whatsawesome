import Image from "next/image";
import { CommandMenu } from "@/components/CommandMenu";
import AoeByCategory from "./AoeByCategory";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { config } from "@/lib/config";
import { Slider } from "@/components/ui/slider";

import { Separator } from "@/components/ui/separator";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toSearchParamsUrl } from "@/app/(group)/@sidebar/explore/[hub]/page";
import { CheckIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isHubHomepage } from "@/lib/utils";
import Sidebar, { SearchPanel } from "../Sidebar";

const NEAR_RADIUS = "4";

export default async function Page({ params: { hub, pt, t3, distance } }: any) {
  return (
    <Sidebar>
      <SearchPanel />
      <Separator className="h-px bg-gray-300 mb-6" />
      <div className="px-8 mb-0">
        {/* <p className="text-xl text-muted-foreground mb-4">Search</p> */}

        {true && (
          <>
            <div className="flex items-center justify-between w-full mb-4 font-semibold text-lg capitalize text-muted-foreground">
              Search Area{" "}
              <div className="flex items-center gap-0">
                <Button variant={"link"} className="font-normal text-sm px-1">
                  custom search
                </Button>
                <Button variant={"ghost"} size={"icon"}>
                  <InfoCircledIcon className="stroke-1 h-4 w-4 text-white bg-muted-foreground rounded-full" />
                </Button>
              </div>
            </div>

            <ToggleGroup
              className="mb-8 justify-start grid grid-cols-12 gap-2"
              type="single"
              value={distance}
            >
              {[0, NEAR_RADIUS, 20].map((miles) => (
                <ToggleGroupItem
                  key={miles}
                  variant={"default"}
                  className="group border border-gray-300 bg-gray-200 hover:bg-gray-200 py-4 relative col-span-4 text-center capitalize data-[state=on]:bg-blue-500_ data-[state=on]:text-white_ aria-checked:bg-blue-500_  "
                  value={String(miles)}
                  asChild
                >
                  <Link
                    className="text-xs block py-4 min-h-10 text-balance aria-checked:bg-blue-500_  aria-checked:text-white_ aria-checked:border-muted-foreground/50_"
                    href={`/foobar/explore/${hub}/${pt}/${t3}/${miles}`}
                  >
                    {miles === 0 && `in ${hub.replace("-", ", ")}`}
                    {miles === NEAR_RADIUS && `near ${hub.replace("-", ", ")}`}
                    <span className="text-xs">
                      {miles > NEAR_RADIUS && `within ${miles} miles`}
                    </span>
                    <div className="group-aria-checked:block hidden h-4 w-4 bg-[#4c98fd] absolute -top-1 -right-1 rounded-full  items-center justify-center">
                      <CheckIcon className="h-4 w-4 p-0.5 text-white" />
                    </div>
                  </Link>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </>
        )}
      </div>
      {/* <nav className="my-8 px-8 grid grid-cols-4 md:flex items-center gap-2">
        {[0, 1, 4, 8, 12, 20, 40].map((d) => (
          <Button key={d} className="col-span-1" variant={"outline"} asChild>
            <Link href={`/foobar/${hub}/${pt}/${t3}/${d}`}>{d}</Link>
          </Button>
        ))}
      </nav> */}
      <div className="px-8 pt-2 flex items-center justify-between w-full mb-0 font-semibold text-lg capitalize text-muted-foreground min-h-[48px]">
        Search by Category
        {!isHubHomepage({ hub, pt, t3 }) && (
          <Button
            size="sm"
            variant={"link"}
            className="text-xs px-0 text-muted-foreground"
            asChild
          >
            <Link href={`/foobar/explore/${hub}`}>View {hub} Profile</Link>
          </Button>
        )}
      </div>
      <AoeByCategory hub={hub} t3={t3} distance={distance} />
    </Sidebar>
  );
}
