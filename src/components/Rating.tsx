import Image from "next/image";
import { config } from "@/lib/config";
import { Badge } from "./ui/badge";
import { BanIcon } from "lucide-react";

export default function Rating({
  rating,
  size = 24,
}: {
  rating: number;
  size?: number;
}) {
  // const val = Math.min(96, Math.max(0, value - 32));
  return (
    <div className="flex items-center gap-1 pl-0">
      {rating < 0.249 && (
        <div className="relative mr-2">
          <Image
            alt="vote"
            src={config.logoPath}
            width={18}
            height={18}
            className="grayscale opacity-50"
          />
          <BanIcon className="text-gray-400 opacity-60 h-8 w-8 text-muted-foreground ml-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      )}

      {rating > 0.249 && rating < 0.749 && (
        <>
          <HalfMushroom className="grayscale opacity-60" size={size} />
          <Image
            // key={i}
            alt="vote"
            src={config.logoPath}
            width={size}
            height={size}
            className="opacity-10 grayscale"
          />{" "}
          <Image
            // key={i}
            alt="vote"
            src={config.logoPath}
            width={size}
            height={size}
            className="opacity-10 grayscale"
          />
        </>
      )}

      {rating > 0.749 && rating < 1.249 && (
        <>
          {" "}
          <Image
            // key={i}
            alt="vote"
            src={config.logoPath}
            width={size}
            height={size}
            className="opacity-60 grayscale"
          />
          <Image
            // key={i}
            alt="vote"
            src={config.logoPath}
            width={size}
            height={size}
            className="opacity-10 grayscale"
          />{" "}
          <Image
            // key={i}
            alt="vote"
            src={config.logoPath}
            width={size}
            height={size}
            className="opacity-10 grayscale"
          />
        </>
      )}
      {rating > 1.249 && rating < 1.749 && (
        <>
          <Image
            // key={i}
            alt="vote"
            src={config.logoPath}
            width={size}
            height={size}
            className="opacity-60 grayscale"
          />
          <HalfMushroom className="grayscale opacity-60" size={size} />
          <Image
            // key={i}
            alt="vote"
            src={config.logoPath}
            width={size}
            height={size}
            className="opacity-10 grayscale"
          />
        </>
      )}
      {rating > 1.749 && rating < 2.249 && (
        <>
          <Image
            // key={i}
            alt="vote"
            src={config.logoPath}
            width={size}
            height={size}
            className="opacity-100"
          />
          <Image
            // key={i}
            alt="vote"
            src={config.logoPath}
            width={size}
            height={size}
            className="relative _top-[-3px] opacity-100"
          />
          <Image
            // key={i}
            alt="vote"
            src={config.logoPath}
            width={size}
            height={size}
            className="opacity-10 grayscale"
          />
        </>
      )}
      {rating > 2.249 && rating < 2.749 && (
        <>
          <Image
            // key={i}
            alt="vote"
            src={config.logoPath}
            width={size}
            height={size}
            className="opacity-100"
          />
          <Image
            // key={i}
            alt="vote"
            src={config.logoPath}
            width={size}
            height={size}
            className="relative _top-[-3px] opacity-100"
          />
          <HalfMushroom size={size} />
        </>
      )}
      {rating > 2.749 && (
        <>
          <Image
            // key={i}
            alt="vote"
            src={config.logoPath}
            width={size}
            height={size}
            className="opacity-100"
          />
          <Image
            // key={i}
            alt="vote"
            src={config.logoPath}
            width={size}
            height={size}
            className="relative _top-[-3px] opacity-100"
          />
          <Image
            // key={i}
            alt="vote"
            src={config.logoPath}
            width={size}
            height={size}
            className="relative _top-[-6px] animate-rubberBandJumpNoDelay_"
          />
        </>
      )}
    </div>
  );
}

function HalfMushroom({ className = "", size = 24 }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        alt="vote"
        src={"/cute-mushroom-blue-half2.png"}
        width={size}
        height={size}
        className="opacity-100 relative z-10"
      />
      <Image
        // key={i}
        alt="vote"
        src={config.logoPath}
        width={size}
        height={size}
        className="opacity-5 hidden grayscale absolute top-0 left-0 z-0"
      />
    </div>
  );
}
