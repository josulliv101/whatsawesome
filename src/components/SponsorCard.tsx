import { PropsWithChildren } from "react";
import Image from "next/image";
import { GlobeIcon } from "lucide-react";

export default function SponsorCard({
  name,
  pic,
}: PropsWithChildren<{ name: string; pic: string }>) {
  return (
    <div className="w-full opacity-80 shadow-sm_ px-2 py-2 bg-white/80 border rounded-md flex items-center gap-6 max-w-md">
      <Image
        alt={name}
        width="32"
        height="32"
        src={pic}
        className="object-cover"
      />
      <div>
        <a
          className="underline font-semibold text-sm text-balance"
          href="https://www.constantcontact.com"
        >
          {name}
        </a>
        <br />
        <span className="font-semibold_ hidden">
          sponsor of blue mushroom{" "}
          <GlobeIcon className="h-4 w-4 text-muted-foreground mr-1 relative top-[-1px] inline-flex" />
          Boston
        </span>{" "}
      </div>
    </div>
  );
}
