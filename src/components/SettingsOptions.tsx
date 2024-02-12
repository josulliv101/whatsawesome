import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import {
  UserIcon,
  MoreVerticalIcon,
  PlayIcon,
  PlayCircleIcon,
} from "lucide-react";
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
  DropdownMenuPlayItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useAuthContext } from "./AuthContext";
import { signOut } from "@/lib/firebase";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export function SettingsOptions({
  enableLogoAnimation,
  onEnableLogoAnimationChange,
  onPlayAnimation,
  forcePlayAnimation,
  setForcePlayAnimation,
}: {
  enableLogoAnimation?: boolean;
  onEnableLogoAnimationChange: (b: boolean) => void;
  onPlayAnimation: () => void;
  forcePlayAnimation?: boolean;
  setForcePlayAnimation: Dispatch<SetStateAction<boolean>>;
}) {
  const refPlayButton = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!forcePlayAnimation) {
      refPlayButton.current?.focus();
    }
  }, [forcePlayAnimation]);

  console.log("useruser", user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-8 w-8 px-0 py-0 items-center justify-center"
        >
          {!user && <MoreVerticalIcon className="h-4 w-4" />}
          {user && (
            <Avatar className="mr-0 flex items-center w-8">
              <AvatarImage
                className="h-8 w-8"
                src={user.photoUrl}
                alt={user.displayName ?? ""}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {user && (
          <>
            <DropdownMenuLabel className="bg-muted text-muted-foreground text-sm flex items-center gap-6 px-4 py-3">
              {user.photoUrl && (
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={user.photoUrl}
                    alt={user.displayName ?? ""}
                    className="w-12 h-12"
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
              className="h-16 text-lg bg-primary hover:bg-primary/90 focus:bg-primary/90 focus-visible:bg-primary/90 text-primary-foreground hover:text-primary-foreground focus:text-primary-foreground focus-visible:text-primary-foreground cursor-pointer"
              asChild
            >
              <Button className="" asChild>
                <Link className="" href="/login">
                  Login
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Logo Animation
        </DropdownMenuLabel>

        <DropdownMenuCheckboxItem
          className="capitalize text-sm justify-between items-center"
          checked={enableLogoAnimation}
          onCheckedChange={(val, ...rest) => {
            onEnableLogoAnimationChange(val);
          }}
        >
          Play Once on Page Load
        </DropdownMenuCheckboxItem>
        {/* <DropdownMenuLabel className="text-muted-foreground text-xs">
          <Button
            disabled={!!forcePlayAnimation}
            size={"sm"}
            onClick={(ev) => {
              ev.stopPropagation();
              ev.preventDefault();
              setForcePlayAnimation(true);
            }}
            variant="secondary"
            className="gap-2 py-0 px-2 h-8 border"
          >
            <PlayIcon className="h-4 w-4 text-gray-500" /> play
          </Button>
        </DropdownMenuLabel> */}
        <DropdownMenuItem
          ref={refPlayButton}
          className="capitalize text-sm justify-between items-center px-0"
          asChild
        >
          <Button
            disabled={!!forcePlayAnimation}
            size={"sm"}
            onClick={(ev) => {
              ev.stopPropagation();
              ev.preventDefault();
              setForcePlayAnimation(true);
            }}
            style={{ outline: "none", boxShadow: "none" }}
            variant="secondary"
            className="gap-2 focus-visible:ring-0:focus-visible ring-0 ring-offset-0 focus-visible:ring-offset-0 select-none focus-visible:outline-none hover:outline-none capitalize  py-0 px-2 h-8 border-0 focus-visible:border-0 hover:border-0 w-full justify-start rounded-sm bg-transparent hover:bg-secondary/80 outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 font-normal"
          >
            <div className="w-6 h-6 border ml-[-7px] inline-flex items-center justify-center rounded-full">
              <PlayIcon className="h-3 w-3 text-gray-500 relative ml-[2px]" />
            </div>{" "}
            Play now
          </Button>
        </DropdownMenuItem>
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
            <DropdownMenuItem className="capitalize text-sm" asChild>
              <Link className="" href="/add/profile">
                Create Profile
              </Link>
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
