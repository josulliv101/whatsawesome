"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronDownIcon,
  CloudDrizzleIcon,
  MehIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { config } from "@/lib/config";
import { useAuthContext } from "./AuthContext";
import { useRouter } from "next/navigation";
import { rateReason } from "@/lib/firebase";

export default function RateReason({
  className = "",
  reasonId,
  profileId,
  userRating: initialUserRating,
  // onRatingOptionSelected,
}: PropsWithChildren<{
  className?: string;
  reasonId: string;
  profileId: string;
  userRating?: number;
  // onRatingOptionSelected?: (val: number) => void;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const [userRating, setUserRating] = useState(initialUserRating);
  const user = useAuthContext();
  const router = useRouter();

  const handleSelect = async (val: any) => {
    console.log(val);
    if (!user || !user.id) {
      setIsOpen(false);
      return toast("Authentication required.", {
        description: "Please login to leave a rating.",
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      });
    }
    user?.id && (await rateReason(user.id, profileId, reasonId, Number(val)));
    setIsOpen(false);
    setUserRating(Number(val));
    toast(`Save successful`, {
      description: "Thank you for giving your input.",
      // action: {
      //   label: user?.id,
      //   onClick: () => router.push("/login"),
      // },
    });
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size={"sm"}
          className={`ml-auto text-muted-foreground ${className}`}
          onClick={() => setIsOpen(true)}
        >
          {typeof userRating === "undefined" && "Rate This"}
          {userRating === 3 && (
            <div className="flex flex-row items-center justify-center  basis-20 gap-2 ml-0">
              <Image alt="vote" src={config.logoPath} width={18} height={18} />
              <Image alt="vote" src={config.logoPath} width={18} height={18} />
              <Image alt="vote" src={config.logoPath} width={18} height={18} />
            </div>
          )}
          {userRating === 2 && (
            <div className="flex flex-row items-center justify-center  basis-20 gap-2 ml-0">
              <Image alt="vote" src={config.logoPath} width={18} height={18} />
              <Image alt="vote" src={config.logoPath} width={18} height={18} />
            </div>
          )}
          {userRating === 1 && (
            <div className="grayscale flex flex-row items-center justify-center  basis-20 gap-2 ml-0">
              <Image alt="vote" src={config.logoPath} width={18} height={18} />
            </div>
          )}
          {userRating === 0 && (
            <MehIcon className="h-5 w-5 text-muted-foreground ml-0" />
          )}
          {userRating === -1 && (
            <ThumbsDownIcon className="h-5 w-5 text-muted-foreground ml-0" />
          )}
          <ChevronDownIcon className="flex-1 ml-2 h-4 w-4 min-w-4 min-h-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[360px] " align="end">
        <Command>
          {/* <CommandInput placeholder="Select new role..." /> */}
          <CommandList>
            {/* <CommandEmpty>No roles found.</CommandEmpty> */}
            <CommandGroup>
              <CommandItem
                value="3"
                onSelect={handleSelect}
                className="teamaspace-y-1 flex items-center gap-0"
              >
                <div className="flex flex-row items-center justify-center  basis-20 gap-1 ml-0">
                  <Image
                    alt="vote"
                    src={config.logoPath}
                    width={18}
                    height={18}
                  />
                  <Image
                    alt="vote"
                    src={config.logoPath}
                    width={18}
                    height={18}
                  />
                  <Image
                    alt="vote"
                    src={config.logoPath}
                    width={18}
                    height={18}
                  />
                </div>
                <div className="flex flex-col flex-1 items-start px-4 py-5  gap-0.5">
                  <p className="hidden">I strongly agree.</p>
                  <p className="text-sm text-muted-foreground">
                    This is a major factor that adds to the overall awesomeness.
                  </p>
                </div>
              </CommandItem>

              <CommandItem
                value="2"
                onSelect={handleSelect}
                className="teamaspace-y-1 flex items-center gap-0"
              >
                <div className=" flex flex-row items-center justify-center basis-20 gap-1 ml-0">
                  <Image
                    alt="vote"
                    src={config.logoPath}
                    width={18}
                    height={18}
                  />
                  <Image
                    alt="vote"
                    src={config.logoPath}
                    width={18}
                    height={18}
                  />
                </div>
                <div className="flex flex-col flex-1 items-start px-4 py-5  gap-0.5">
                  <p className="hidden">I agree.</p>
                  <p className="text-sm text-muted-foreground">
                    This adds something to the overall awesomeness.
                  </p>
                </div>
              </CommandItem>

              <CommandItem
                value="1"
                onSelect={handleSelect}
                className="teamaspace-y-1 flex items-center gap-0"
              >
                <div className="grayscale flex flex-row items-center justify-center basis-20 gap-2 ml-0">
                  <Image
                    alt="vote"
                    src={config.logoPath}
                    width={18}
                    height={18}
                  />
                </div>
                <div className="flex flex-col flex-1 items-start px-4 py-5  gap-0.5">
                  <p className="hidden">Yeah but...</p>
                  <p className="text-sm text-muted-foreground">
                    Accurate but does not contribute to the overall awesomeness.
                  </p>
                </div>
              </CommandItem>
              <CommandItem
                value="0"
                onSelect={handleSelect}
                className="teamaspace-y-1 flex items-center gap-0"
              >
                <div className="flex flex-row items-center justify-center basis-20 gap-2 ml-0">
                  <MehIcon className="h-5 w-5 text-muted-foreground ml-0" />
                </div>
                <div className="flex flex-col flex-1 items-start px-4 py-5 gap-0.5">
                  <p className="hidden">I do not know.</p>
                  <p className="text-sm text-muted-foreground">
                    I have no experience with this.
                  </p>
                </div>
              </CommandItem>

              <CommandItem
                value="-1"
                onSelect={handleSelect}
                className="teamaspace-y-1 flex items-center gap-0"
              >
                <div className="flex flex-row items-center justify-center basis-20 gap-2 ml-0">
                  <ThumbsDownIcon className="h-5 w-5 text-muted-foreground ml-0" />
                </div>
                <div className="flex flex-col flex-1 items-start px-4 py-5 gap-0.5">
                  <p className="hidden">I disagree.</p>
                  <p className="text-sm text-muted-foreground">
                    This statement is not accurate.
                  </p>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
