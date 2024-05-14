import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EllipsisIcon, GripHorizontalIcon } from "lucide-react";
import { PropsWithChildren } from "react";

export default function SearchLogoTabs({
  children,
  onChange,
  value,
}: PropsWithChildren<any>) {
  return (
    <>
      <Tabs value={value} onValueChange={onChange}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="grid">
            <span className="sr-only">Complete</span>
            <GripHorizontalIcon className="w-6 h-6" />
          </TabsTrigger>
          <TabsTrigger value="row">
            <span className="sr-only">Insert</span>
            <EllipsisIcon className="w-6 h-6" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {children}
    </>
  );
}
