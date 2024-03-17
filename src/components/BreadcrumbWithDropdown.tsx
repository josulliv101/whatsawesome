import { ChevronDown, Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function BreadcrumbWithDropdown({ hub }: { hub: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="capitalize" href={`/`}>
            Blue Mushroom
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        {/* <BreadcrumbItem>
          <BreadcrumbLink className="capitalize" href={`/${hub}`}>
            {hub.replace("-", " ")}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator> */}
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 capitalize">
              {hub.replace("-", " ")}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem disabled asChild>
                <Link href="/arlington-ma/place">Arlington, MA</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/boston/place">Boston, MA</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/cambridge-ma/place">Cambridge, MA</Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled asChild>
                <Link href="/lexington-ma/place">Lexington, MA</Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled asChild>
                <Link href="/somerville-ma/place">Somerville, MA</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        {/* <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Coffeehouse</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
