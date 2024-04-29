import { CommandMenu } from "@/components/CommandMenu";
import { config } from "@/lib/config";
import { EqualIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-blue-100/50  flex justify-center items-center h-full">
      <div className="w-1/2 my-36 max-w-1/2 px-2 flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-4 font-semibold text-lg _capitalize text-muted-foreground">
          Discover excellence in the world around you.
          <span className="font-normal text-sm"></span>
        </div>
        <CommandMenu />
        <div className="w-full py-3 px-2 flex items-center justify-between">
          <p className="w-1/2 text-muted-foreground text-sm ">
            Quick links:{" "}
            <Link href="/explore/boston" className="text-blue-500">
              Boston
            </Link>
            , Chicago, NYC, Seattle
          </p>
          <p className="w-1/2 text-sm text-muted-foreground text-right  flex items-end justify-end gap-3">
            more{" "}
            <img
              className="w-4 h-4 opacity-70 grayscale relative -top-0.5"
              src={config.logoPath}
              width="24"
              height="24"
            />{" "}
            <EqualIcon className="h-5 w-5" /> more excellence
          </p>
        </div>
      </div>
    </div>
  );
}
