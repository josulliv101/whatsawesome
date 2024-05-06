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

export default function Header({ children, authButton }: any) {
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
      <div className="relative">{children}</div>
    </header>
  );
}
