"use client";

import ErrorPlaceholder from "@/app__/components/error-placeholder";

export default function Error({ error }: { error: unknown }) {
  return <ErrorPlaceholder error={error} />;
}
