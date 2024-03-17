import { PropsWithChildren } from "react";
import Image from "next/image";
import { GlobeIcon } from "lucide-react";
import Link from "next/link";

export default function SponsorCard({
  name,
  pic,
  className = "",
}: PropsWithChildren<{ name: string; pic: string; className?: string }>) {
  return (
    <div
      className={`w-full opacity-80 shadow-sm_ px-2 py-2 bg-white/80 border rounded-md flex items-center gap-6 max-w-md ${className}`}
    >
      <Image
        alt={name}
        width="32"
        height="32"
        src={pic}
        className="object-cover h-[32px] w-[32px]"
      />
      <div>
        <Link
          style={{
            lineHeight: "16px",
            fontSize: name.length > 32 ? "13px" : "16px",
          }}
          className="underline_ font-semibold  text-balance"
          href="/profile/constant-contact"
        >
          {name}
        </Link>
      </div>
    </div>
  );
}
