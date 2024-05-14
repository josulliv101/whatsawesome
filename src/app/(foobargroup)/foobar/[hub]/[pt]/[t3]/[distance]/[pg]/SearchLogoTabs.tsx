import GridIcon from "@/app/icons/GridIcon";
import RowIcon from "@/app/icons/RowIcon";
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
          <TabsTrigger value="grid" className="max-w-[36px]">
            <span className="sr-only">Complete</span>
            <GridIcon className="w-4 h-4 text-muted-foreground" />
          </TabsTrigger>
          <TabsTrigger value="row" className="max-w-[36px]">
            <span className="sr-only">Insert</span>
            <RowIcon className="w-3.5 h-3.5 text-muted-foreground min-h-[16px]" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {children}
    </>
  );
}
