"use client";

import { config } from "@/lib/config";
import { ReactRenderer } from "@storybook/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  PropsWithChildren,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import useLocalStorage from "./useLocalStorage";
import { useHtmlContext } from "next/dist/shared/lib/html-context.shared-runtime";
import { useHubContext } from "./HubContext";

export default forwardRef(function HubLink(
  {
    children,
    className,
    href,
    hub,
    title,
    ...props
  }: PropsWithChildren<{
    hub?: string;
    primaryTag?: string;
    href?: string;
    className?: string;
    title?: string;
  }>,
  ref
) {
  const localStoragePrimaryTag = useHubContext();
  return (
    <Link
      className={className}
      href={`/${hub}/${localStoragePrimaryTag}`}
      {...props}
    >
      {children} / {hub} / {localStoragePrimaryTag}
    </Link>
  );
});
