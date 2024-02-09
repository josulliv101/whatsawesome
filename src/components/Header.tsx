import Link from "next/link";
import NavMenu from "./NavMenu";
import { config } from "@/lib/config";
import { CommandMenu } from "./CommandMenu";
import { UserCircle2 as UserIcon } from "lucide-react";
import LoginButton from "./LoginButton";
import ThemeToggle from "./Themetoggle";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-950 border-b sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <NavMenu />

        <div className="items-center gap-5 flex flex-0 justify-between lg:justify-end">
          <CommandMenu />
          <LoginButton />
          <ThemeToggle />
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
