import { config } from "@/lib/config";
import { Badge } from "./ui/badge";

export default function Rating({ value }: { value: number }) {
  // const val = Math.min(96, Math.max(0, value - 32));
  return (
    <Badge
      variant="outline"
      className="group-hover:animate-rubberBand flex-row rounded-sm absolute top-[-44px] right-[8px] bg-white px-1 inline-flex items-center gap-1"
    >
      <img className="h-4 w-auto " src={config.logoPath} alt="whatsawesome" />
      <div className="text-xs relative font-normal  transition-transform duration-300 ease-in">
        {isNaN(value) ? 0 : value}%
      </div>
      {/* <img className="h-4 w-auto" src="/cute-mushroom.png" alt="whatsawesome" />
      <img className="h-4 w-auto" src="/cute-mushroom.png" alt="whatsawesome" />
      <img
        className="h-4 w-auto grayscale opacity-50"
        src="/cute-mushroom.png"
        alt="whatsawesome"
      />
      <img
        className="h-4 w-auto grayscale opacity-50"
        src="/cute-mushroom.png"
        alt="whatsawesome"
      /> */}
    </Badge>
  );
}
