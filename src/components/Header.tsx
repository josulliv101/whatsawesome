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
import { useState } from "react";

export default function Header() {
  const isMounted = useIsMounted();
  const [forcePlayAnimation, setForcePlayAnimation] = useState(false);
  const [storedEnableLogoAnimation, setStoredEnableLogoAnimation] =
    useLocalStorage("enableLogoAnimation", false);
  console.log("storedEnableLogoAnimation", storedEnableLogoAnimation);
  console.log("forcePlayAnimation", forcePlayAnimation);
  return (
    <header className="bg-white dark:bg-gray-950 border-b sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-8xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <NavMenu
          forcePlayAnimation={forcePlayAnimation}
          enableLogoAnimation={storedEnableLogoAnimation}
          setForcePlayAnimation={setForcePlayAnimation}
        />

        <div className="items-center gap-4 flex flex-0 justify-between lg:justify-end">
          {/* <CommandMenu /> */}
          {/* <ThemeToggle /> */}
          {/* <LoginButton /> */}
          <SettingsOptions
            enableLogoAnimation={storedEnableLogoAnimation}
            onEnableLogoAnimationChange={setStoredEnableLogoAnimation}
            onPlayAnimation={() => ""}
            forcePlayAnimation={forcePlayAnimation}
            setForcePlayAnimation={setForcePlayAnimation}
          />
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
    </header>
  );
}
