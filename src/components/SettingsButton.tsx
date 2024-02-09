"use client";

import { Button } from "./ui/button";
import { useAuthContext } from "./AuthContext";
import { signOut } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { UserIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";

export default function SettingsButton() {
  const handleLogout = async () => {};

  return (
    <Button
      className="h-8 w-8 text-xs"
      onClick={handleLogout}
      variant={"ghost"}
      size={"icon"}
    >
      <MoreVerticalIcon className="h-4 text-xs stroke-1" />
    </Button>
  );
}
