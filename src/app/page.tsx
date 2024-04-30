import { CommandMenu } from "@/components/CommandMenu";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { EqualIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

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
          <p className="w-2/3 text-muted-foreground text-sm flex items-center">
            Quick links:{" "}
            <Button asChild variant="link" className="text-blue-500">
              <Link href="/explore/boston">Boston</Link>
            </Button>
            {["Chicago", "Houston", "NYC", "Seattle"].map((id) => (
              <Button
                disabled
                // onClick={() =>
                //   toast(
                //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                //       <code className="text-white">
                //         Functionality not yet implemented.
                //       </code>
                //     </pre>
                //   )
                // }
                variant="link"
              >
                {id}
              </Button>
            ))}
          </p>
          <p className="w-1/3 text-sm text-muted-foreground text-right  flex items-end justify-end gap-3">
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
