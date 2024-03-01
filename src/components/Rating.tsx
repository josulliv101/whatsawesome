import { config } from "@/lib/config";
import { Badge } from "./ui/badge";

export default function Rating({ value }: { value: number }) {
  // const val = Math.min(96, Math.max(0, value - 32));
  return (
    <Badge
      title={`${value}% awesome`}
      variant="outline"
      className="group-hover:animate-heartBeat__ bg-popover border flex-row rounded-sm absolute top-[-48px] right-[8px] px-1.5 py-1 inline-flex items-center gap-2"
    >
      <img className="h-4 w-auto " src={config.logoPath} alt="whatsawesome" />
      <div className="text-xs relative font-normal  transition-transform duration-300 ease-in">
        {isNaN(value) ? 0 : value > 2.5 ? 1.5 : value + 0.1}
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
