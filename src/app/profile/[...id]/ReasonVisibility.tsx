"use client";

import { PropsWithChildren } from "react";
import useReasonVisibilityStore from "./useReasonVisibilityStore";

export function ReasonVisibility({
  className,
  children,
  tags,
}: PropsWithChildren<{ className?: string; tags: string[] }>) {
  const { activeTags } = useReasonVisibilityStore();
  const [tag] = activeTags;

  if (!tag || tag === "all" || tags.includes(tag)) {
    return <div>{children}</div>;
  }
  return null;
}
