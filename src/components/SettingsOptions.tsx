"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { UserIcon, MoreVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useAuthContext } from "./AuthContext";
import { getCurrentUser, signOut } from "@/lib/firebase";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export function SettingsOptions({}) {
  const { theme, setTheme } = useTheme();
  const user = useAuthContext();
  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const isSuccess = await signOut();
    if (isSuccess && pathName === "/login") {
      router.push("/", {});
    }
  };
  console.log("useruser", user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {user && (
          <>
            <DropdownMenuLabel className="bg-muted text-muted-foreground text-sm flex items-center gap-6 px-4 py-3">
              {user.photoUrl && (
                <Avatar>
                  <AvatarImage
                    src={user.photoUrl}
                    alt={user.displayName ?? ""}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
              {user.displayName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {!user && (
          <>
            <DropdownMenuItem
              className="bg-muted text-lg font-semibold cursor-pointer text-muted-foreground flex justify-center px-3 py-4"
              asChild
            >
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Settings
        </DropdownMenuLabel>

        <DropdownMenuCheckboxItem
          className="capitalize text-sm"
          checked={true}
          onCheckedChange={(value) => console.log(value)}
        >
          Logo animation enabled
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Theme
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        {user && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Admin
            </DropdownMenuLabel>
            <DropdownMenuItem className="capitalize text-sm">
              create new profile
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize text-sm">
              manage tags
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="capitalize text-sm"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
