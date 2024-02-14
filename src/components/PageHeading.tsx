import Link from "next/link";
import { PropsWithChildren, ReactNode, isValidElement } from "react";
import NavMenu from "./NavMenu";
import { cn } from "@/lib/utils";

export const Heading = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <h2
    className={cn(
      "flex items-center text-balance text-xl lg:text-4xl font-semibold tracking-tight gap-2 mb-2",
      className
    )}
  >
    {children}
  </h2>
);

export default function PageHeading({
  children,
  icon,
  heading,
  subhead,
  className,
}: PropsWithChildren<{
  icon?: ReactNode;
  heading: string | ReactNode;
  subhead?: string | ReactNode;
  className?: string;
}>) {
  return (
    <div className={`mb-8 ${className}`}>
      {typeof heading === "string" && <Heading>{heading}</Heading>}
      {isValidElement(heading) && heading}
      {subhead && (
        <p className="text-md lg:text-lg text-muted-foreground flex items-center gap-1">
          {icon}
          {subhead}
        </p>
      )}
      {children}
    </div>
  );
}
