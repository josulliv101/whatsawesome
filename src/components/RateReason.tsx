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
  BanIcon,
  ChevronDownIcon,
  CloudDrizzleIcon,
  MehIcon,
  // MessageCircleQuestion as MehIcon,
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
  tag,
  // onRatingOptionSelected,
}: PropsWithChildren<{
  className?: string;
  reasonId: string;
  profileId: string;
  userRating?: number;
  tag?: string;
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
          variant="secondary"
          size={"sm"}
          className={`ml-auto text-muted-foreground ${className}`}
          onClick={() => setIsOpen(true)}
        >
          {typeof userRating === "undefined" && `Rate`}
          {userRating === 3 && (
            <div className="flex flex-row items-center justify-center  basis-20 gap-1 ml-0">
              <Image alt="vote" src={config.logoPath} width={14} height={14} />
              <Image alt="vote" src={config.logoPath} width={14} height={14} />
              <Image alt="vote" src={config.logoPath} width={14} height={14} />
            </div>
          )}
          {userRating === 2 && (
            <div className="flex flex-row items-center justify-center  basis-20 gap-1 ml-0">
              <Image alt="vote" src={config.logoPath} width={14} height={14} />
              <Image alt="vote" src={config.logoPath} width={14} height={14} />
            </div>
          )}
          {userRating === 1 && (
            <div className="grayscale flex flex-row items-center justify-center  basis-20 gap-2 ml-0">
              <Image alt="vote" src={config.logoPath} width={14} height={14} />
            </div>
          )}
          {userRating === 0 && (
            <MehIcon className="h-3.5 w-3.5 text-muted-foreground ml-0" />
          )}
          {userRating === -1 && (
            <ThumbsDownIcon className="h-3.5 w-3.5 text-muted-foreground ml-0" />
          )}
          <ChevronDownIcon className="flex-1 ml-2 h-4 w-4 min-w-4 min-h-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[230px] " align="end">
        <div className="bg-primary text-primary-foreground font-semibold text-lg px-6 py-4">
          <div className="mb-0.5 capitalize">{tag}</div>
          {
            <div className="text-sm opacity-80 font-normal">
              Level of Excellence
            </div>
          }
        </div>
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
                <div className="flex flex-col flex-1 items-start px-4 py-3.5  gap-0.5">
                  <p className="hidden">I strongly agree.</p>
                  <p className="text-lg text-muted-foreground">
                    {/* This was a major factor that added to the overall
                    excellence. */}
                    Exceptional
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
                <div className="flex flex-col flex-1 items-start px-4 py-3.5  gap-0.5">
                  <p className="hidden">I agree.</p>
                  <p className="text-lg text-muted-foreground">
                    {/* This added a good amount to the overall excellence. */}
                    Substantial
                  </p>
                </div>
              </CommandItem>
              <CommandItem
                value="1"
                onSelect={handleSelect}
                className="teamaspace-y-1 flex items-center gap-0"
              >
                <div className="grayscale_ flex flex-row items-center justify-center basis-20 gap-2 ml-0">
                  <Image
                    alt="vote"
                    src={config.logoPath}
                    width={18}
                    height={18}
                    className="grayscale"
                  />
                </div>
                <div className="flex flex-col flex-1 items-start justify-start px-4 py-3.5  gap-0.5">
                  <p className="hidden">Yeah but...</p>
                  <p className="text-lg text-muted-foreground">
                    {/* This was a minor factor that added to the overall
                    excellence. */}
                    Minimal
                  </p>
                </div>
              </CommandItem>
              <CommandItem
                value="-1"
                onSelect={handleSelect}
                className="teamaspace-y-1 flex items-center gap-0"
              >
                <div className="rotate-180_ grayscale_ flex flex-row items-center justify-center basis-20 gap-2 ml-0">
                  <div className="relative">
                    <Image
                      alt="vote"
                      src={config.logoPath}
                      width={18}
                      height={18}
                      className="grayscale opacity-50"
                    />
                    <BanIcon className="text-gray-500 opacity-60 h-8 w-8 text-muted-foreground ml-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <div className="flex flex-col flex-1 items-start justify-start px-4 py-3.5 gap-0.5">
                  <p className="hidden">I disagree.</p>
                  <p className="text-lg text-muted-foreground">
                    {/* This did not contribute to the overall excellence. */}
                    none
                  </p>
                </div>
              </CommandItem>{" "}
              <CommandItem
                value="0"
                onSelect={handleSelect}
                className="teamaspace-y-1 flex items-center gap-0 hidden"
              >
                <div className="flex flex-row items-center justify-center basis-20 gap-2 ml-0">
                  <ThumbsDownIcon className="h-5 w-5 text-muted-foreground ml-0" />
                </div>
                <div className="flex flex-col flex-1 items-start px-4 py-3.5 gap-0.5">
                  <p className="hidden">I do not know.</p>
                  <p className="text-lg text-muted-foreground">
                    {/* I have no experience with this. */}I disagree.
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
