"use client";

import { useAuthContext } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function ProfileEditButton({ className }: { className?: string }) {
  const { id } = useParams();
  const pathname = usePathname();
  const user = useAuthContext();

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <>
      <Button className={className} variant={"outline"} size={"sm"}>
        <Link href={`/edit/profile/${id}`}>Edit</Link>
      </Button>
    </>
  );
}
