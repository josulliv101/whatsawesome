import { CommandMenu } from "@/components/CommandMenu";
import { config } from "@/lib/config";
import { EqualIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="bg-blue-100/50  flex justify-center items-center h-full">
      <div className="w-1/2 my-36 max-w-1/2 flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-4 font-semibold text-lg _capitalize text-muted-foreground">
          Discover excellence in the world around you.
          <span className="font-normal text-sm"></span>
        </div>
        <CommandMenu placeHolderText="Search by name, location, category & more" />
        <p className="w-full text-md text-muted-foreground text-right py-3 px-4 flex items-center justify-end gap-3">
          more{" "}
          <img
            className="w-5 h-5 opacity-70 grayscale"
            src={config.logoPath}
            width="14"
            height="14"
          />{" "}
          <EqualIcon className="h-5 w-5" /> more excellence
        </p>
      </div>
    </div>
  );
}
