import { config } from "@/lib/config";
import { BanIcon } from "lucide-react";
import Image from "next/image";

export default function Legend() {
  return (
    <div className="animate-legendSlideIn fixed bg-gray-50 border rounded-md z-50 left-1/2 opacity-0 -translate-x-1/2 flex flex-row text-sm items-center justify-center gap-10 py-3 px-4 w-full">
      <span className="text-muted-foreground font-semibold">
        Excellence Levels:
      </span>
      <div className="flex items-center gap-1">
        <div className="relative">
          <Image
            alt="vote"
            src={config.logoPath}
            width={14}
            height={14}
            className="grayscale opacity-50"
          />
          <BanIcon className="text-gray-500 opacity-60 h-6 w-6 text-muted-foreground ml-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <span className="text-muted-foreground pl-2 ">None</span>
      </div>

      <div className="flex items-center gap-1">
        <Image
          className="grayscale opacity-60"
          alt="vote"
          src={config.logoPath}
          width={18}
          height={18}
        />
        <span className="text-muted-foreground pl-2 ">Minimal</span>
      </div>
      <div className="flex items-center gap-1">
        <Image alt="vote" src={config.logoPath} width={18} height={18} />
        <Image alt="vote" src={config.logoPath} width={18} height={18} />

        <span className="text-muted-foreground pl-2">Substantial</span>
      </div>
      <div className="flex items-center gap-1">
        <Image alt="vote" src={config.logoPath} width={18} height={18} />
        <Image alt="vote" src={config.logoPath} width={18} height={18} />
        <Image alt="vote" src={config.logoPath} width={18} height={18} />
        <span className="text-muted-foreground pl-2">Exceptional</span>
      </div>
    </div>
  );
}
