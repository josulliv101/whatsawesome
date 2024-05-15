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
import { useUserScrolledContext } from "./UserScrolled";
import { useInView } from "react-intersection-observer";

export default function Header({ children, authButton }: any) {
  const [_, setUserScrolled] = useUserScrolledContext();

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    initialInView: true,
    // trackVisibility: true,
    onChange: (inView) => setUserScrolled(!inView),
  });

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
    <>
      <div ref={ref} className="w-px h-px top-2 left-0"></div>
      <header className="bg-white dark:bg-gray-950 border-b sticky min-h-[64px] top-0 z-50">
        <div className="relative">{children}</div>
      </header>
    </>
  );
}
