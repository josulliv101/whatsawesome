import Link from "next/link";
import NavMenu from "./NavMenu";

export default function PageHeading({
  heading,
  subhead,
}: {
  heading: string;
  subhead?: string;
}) {
  return (
    <div>
      <h2 className="flex items-center text-xl lg:text-4xl font-semibold tracking-tight mb-1">
        {heading}
      </h2>
      {subhead && (
        <p className="text-md lg:text-lg text-muted-foreground mb-8">
          {subhead}
        </p>
      )}
    </div>
  );
}
