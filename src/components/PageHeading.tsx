import Link from "next/link";
import { ReactNode, isValidElement } from "react";
import NavMenu from "./NavMenu";

export default function PageHeading({
  icon,
  heading,
  subhead,
}: {
  icon?: ReactNode;
  heading: string | ReactNode;
  subhead?: string | ReactNode;
}) {
  return (
    <div>
      {typeof heading === "string" && (
        <h2 className="flex items-center text-balance text-xl lg:text-4xl font-semibold tracking-tight gap-2 mb-1">
          {heading}
        </h2>
      )}
      {isValidElement(heading) && heading}
      {subhead && (
        <p className="text-md lg:text-lg text-muted-foreground mb-8 flex items-center gap-1">
          {icon}
          {subhead}
        </p>
      )}
    </div>
  );
}
