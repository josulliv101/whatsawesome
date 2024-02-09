"use client";

import { Button } from "./ui/button";
import { useAuthContext } from "./AuthContext";
import { signOut } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { UserIcon } from "lucide-react";
import Link from "next/link";

export default function LoginButton() {
  const user = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    const isSuccess = await signOut();
    if (isSuccess) {
      router.push("/", {});
    }
  };

  if (!user) {
    return (
      <>
        <Button className="h-8 w-8" variant={"ghost"} size={"icon"} asChild>
          <Link
            href="/login"
            // className="text-sm font-semibold leading-6 text-muted-foreground"
          >
            <span className="sr-only">login</span>
            <UserIcon className="h-5 w-5 stroke-1 opacity-100 md:opacity-50" />
          </Link>
        </Button>
      </>
    );
  }
  return (
    <Button
      className="h-8 text-xs"
      onClick={handleLogout}
      variant={"ghost"}
      size={"sm"}
    >
      Logout
    </Button>
  );
}
