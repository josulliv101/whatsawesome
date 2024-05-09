import { PropsWithChildren } from "react";

export default function Breadcrumb({ children }: PropsWithChildren) {
  return (
    <div className="sticky top-[64px] z-20 w-full flex items-center justify-between px-8 py-2 bg-gray-100 border-b border-r-gray-400 border-b-gray-300 text-muted-foreground">
      {children}
    </div>
  );
}
