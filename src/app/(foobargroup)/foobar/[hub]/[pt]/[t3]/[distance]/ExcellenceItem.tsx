import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";

export default function ExcellenceItem({
  children,
  name,
  rating = 0,
}: PropsWithChildren<{ name: string; rating?: number }>) {
  return (
    <div>
      <h2 className="text-lg font-semibold flex items-center justify-between">
        {name}
        <Button size={"sm"}>{rating}</Button>
      </h2>
      <div>{children}</div>
    </div>
  );
}
