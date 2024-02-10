"use client";

import { useAuthContext } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useParams } from "next/navigation";

export function ProfileEditButton({ className }: { className?: string }) {
  const { id } = useParams();
  const user = useAuthContext();

  console.log("ProfileEditButton", user);

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <>
      <Button className={className} variant={"outline"} size={"sm"}>
        <Link href={`/admin/edit/${id}`}>Edit</Link>
      </Button>
    </>
  );
}
