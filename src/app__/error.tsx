"use client";

import ErrorPlaceholder from "@/app/components/error-placeholder";

export default function Error({ error }: { error: unknown }) {
  return <ErrorPlaceholder error={error} />;
}
