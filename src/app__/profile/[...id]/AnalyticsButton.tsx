"use client";

import { useAuthContext } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { useAnalyticsContext } from "@/components/useAnalytics";
import { BarChart2Icon } from "lucide-react";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function AnalyticsButton({ className }: { className?: string }) {
  const { state, setState } = useAnalyticsContext();

  return (
    <>
      <Button
        variant={state ? "default" : "secondary"}
        size="sm"
        className={state ? "text-primary-foreground" : "text-muted-foreground"}
        onClick={() => setState && setState(!state)}
      >
        <BarChart2Icon className="mr-2 h-4 w-4" />
        <span className="sr-only_">View Analytics</span>
      </Button>
    </>
  );
}
