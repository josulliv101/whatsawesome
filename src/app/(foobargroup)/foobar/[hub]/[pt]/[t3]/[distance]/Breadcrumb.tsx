import { PropsWithChildren } from "react";

export default function Breadcrumb({ children }: PropsWithChildren) {
  return (
    <div className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-300 text-muted-foreground">
      {children}
    </div>
  );
}
