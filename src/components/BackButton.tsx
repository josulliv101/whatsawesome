"use client";

import { PropsWithChildren } from "react";
import { Button } from "./ui/button";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  const params = useParams();
  const handleClick = () => router.back();

  if (!params.id) {
    return <div />;
  }
  return (
    <Button variant={"link"} onClick={handleClick}>
      <ChevronLeftIcon className="h-6 w-6" />
      Back
    </Button>
  );
}
