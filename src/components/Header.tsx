import Link from "next/link";
import NavMenu from "./NavMenu";
import { config } from "@/lib/config";
import { CommandMenu } from "./CommandMenu";
import { UserCircle2 as UserIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <NavMenu />

        <div className="items-center gap-5 flex flex-0 justify-between lg:justify-end">
          <CommandMenu />
          <Link
            href="/login"
            className="text-sm font-semibold leading-6 text-muted-foreground"
          >
            <span className="sr-only">login</span>
            <UserIcon className="h-6 w-6 stroke-1" />
          </Link>
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
