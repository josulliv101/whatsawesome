"use client";

import Link from "next/link";
import NavMenu from "./NavMenu";
import { config } from "@/lib/config";
import { CommandMenu } from "./CommandMenu";
import { UserCircle2 as UserIcon } from "lucide-react";
import LoginButton from "./LoginButton";
import ThemeToggle from "./ThemeToggle";
import SettingsButton from "./SettingsButton";
import { SettingsOptions } from "./SettingsOptions";
import useLocalStorage from "./useLocalStorage";
import { useIsMounted } from "./useIsMounted";
import { Suspense, useState } from "react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useUserMushroomMapContext } from "./UserMushroomMapContext";

export default function Header() {
  const isMounted = useIsMounted();
  const [userMushroomMap] = useUserMushroomMapContext();
  const usedMushrooms = Object.values(userMushroomMap || {}).filter(
    (item) => item.mushroom === true
  );
  const [forcePlayAnimation, setForcePlayAnimation] = useState(false);
  const [storedEnableLogoAnimation, setStoredEnableLogoAnimation] =
    useLocalStorage("enableLogoAnimation", false);
  // console.log("storedEnableLogoAnimation", storedEnableLogoAnimation);
  // console.log("forcePlayAnimation", forcePlayAnimation);
  return (
    <header className="bg-white dark:bg-gray-950 border-b sticky top-0 z-50">
      <div className="relative">
        <nav
          className="mx-auto flex max-w-8xl items-center justify-between p-4 lg:px-8"
          aria-label="Global"
        >
          <NavMenu
            forcePlayAnimation={forcePlayAnimation}
            enableLogoAnimation={storedEnableLogoAnimation}
            setForcePlayAnimation={setForcePlayAnimation}
          />

          <div className="relative items-center gap-4 flex flex-0 justify-between lg:justify-end">
            {/* <CommandMenu /> */}
            {/* <ThemeToggle /> */}
            {/* <LoginButton /> */}

            {/* <Badge variant={"default"} className="absolute top-0 left-0 z-50">
              12
            </Badge>
            <div className="relative">
              <Image
                src="/crate.png"
                alt="crate"
                width="64"
                height="24"
                className="relative z-10"
              />
              <Image
                alt="vote"
                src={config.logoPath}
                width={16}
                height={16}
                className="opacity-80 absolute z-1 -top-2 left-0 rotate-45"
              />
              <Image
                alt="vote"
                src={config.logoPath}
                width={16}
                height={16}
                className="opacity-80 absolute z-1 -top-2 right-0 rotate-45"
              />
              <Image
                alt="vote"
                src={config.logoPath}
                width={16}
                height={16}
                className="opacity-80 absolute z-1 -top-1 right-10 -rotate-12"
              />
              <Image
                alt="vote"
                src={config.logoPath}
                width={16}
                height={16}
                className="opacity-80 absolute z-1 -top-1 right-5 -rotate-3"
              />
              <Image
                alt="vote"
                src={config.logoPath}
                width={16}
                height={16}
                className="opacity-80 absolute z-1 -top-1 right-3 rotate-45"
              />
              <Image
                alt="vote"
                src={config.logoPath}
                width={16}
                height={16}
                className="opacity-80 absolute z-1 -top-2 right-7 rotate-12"
              />

              <Image
                alt="vote"
                src={config.logoPath}
                width={16}
                height={16}
                className="opacity-80 absolute z-4 top-2 right-10 -rotate-12"
              />
              <Image
                alt="vote"
                src={config.logoPath}
                width={16}
                height={16}
                className="opacity-80 absolute z-1 top-3 right-5 -rotate-3"
              />
              <Image
                alt="vote"
                src={config.logoPath}
                width={16}
                height={16}
                className="opacity-80 absolute z-1 top-3 right-3 rotate-45"
              />
              <Image
                alt="vote"
                src={config.logoPath}
                width={16}
                height={16}
                className="opacity-80 absolute z-1 top-3 right-7 rotate-12"
              />
            </div> */}

            <Suspense>
              <SettingsOptions
                enableLogoAnimation={storedEnableLogoAnimation}
                onEnableLogoAnimationChange={setStoredEnableLogoAnimation}
                onPlayAnimation={() => ""}
                forcePlayAnimation={forcePlayAnimation}
                setForcePlayAnimation={setForcePlayAnimation}
              />
            </Suspense>
          </div>
        </nav>
        <div className="hidden lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Whats Awesome</span>
                <img
                  className="h-8 w-auto"
                  src={config.logoPath}
                  alt="whatsawesome"
                />
              </Link>
            </div>
            <div className="mt-6 flow-root"></div>
          </div>
        </div>
        {/* <div className="absolute top-2 right-20 rel scale-95_ hidden_">
          <Image
            src="/watercan-level.png"
            width="200"
            height="170"
            alt="basket"
            className="w-[50px] h-auto"
          />
          <Badge
            variant={"secondary"}
            className="absolute -bottom-1 -right-2 bg-gray-100 font-normal rounded-full scale-75 px-1"
          >
            20
          </Badge>
        </div> */}
        <div className="absolute top-3 right-56 rel scale-95_ hidden_">
          <Button variant={"ghost"} asChild>
            <Link href="/">How It Works</Link>
          </Button>
        </div>
        <Separator
          className="absolute top-5 right-52 mr-3 mt-1 h-5 bg-muted-foreground/50"
          orientation="vertical"
        />
        <div className="absolute top-2 right-28 rel scale-95_ hidden_">
          <div className="hidden text-sm text-muted-foreground absolute left-0 w-[240px] -translate-x-full">
            Leave a mushroom to vouch for a business/area of excellence.
          </div>
          <Image
            src="/basket-low.png"
            width="400"
            height="211"
            alt="basket"
            className="w-[80px] h-auto"
          />
          <Badge
            variant={"default"}
            className="absolute -bottom-1 -right-2 font-normal_ rounded-full scale-110 px-1"
          >
            {40 - usedMushrooms.length}
          </Badge>
        </div>
      </div>
    </header>
  );
}
