"use client";

import { PropsWithChildren } from "react";
import useDisablePageStore from "./useDisablePageStore";

export default function DisablePage({ children }: PropsWithChildren) {
  const isDisabled = useDisablePageStore((state) => state.isDisabled);
  return (
    <div className="animate-fadeIn w-full">
      <div
        className={` transition-all duration-150 ease-in ${
          isDisabled ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
