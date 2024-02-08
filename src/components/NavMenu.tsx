"use client";

import * as React from "react";
import Link from "next/link";
import { ThumbsDownIcon, Globe as NetworkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import HubLink from "./HubLink";
import { useParams } from "next/navigation";
import { config } from "@/lib/config";
import { Badge } from "./ui/badge";

const components: {
  title: string;
  href?: string;
  hub?: string;
  description: string;
}[] = [
  {
    title: "By City",
    href: "/view/all/place/city",
    description: "Explore people & places within a city.",
  },
  {
    title: "By College",
    href: "/view/all/place/college",
    description: "Explore people & places within a college.",
  },
  {
    title: "People in Sports",
    href: "/view/all/person/sports",
    description: "Explore by sport. Filter by category.",
  },
  {
    title: "People in Comedy",
    href: "/view/all/person/comedian",
    description: "Explore whose who in comedy.",
  },
  {
    title: "By Tag",
    href: "/boston/place/museum",
    description: "Explore by mixing and matching tags.",
  },
  {
    title: "NYC",
    href: "/new-york-city/person/comedian",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function NavMenu({ children }: React.PropsWithChildren) {
  const { tags, id: profileId } = useParams();
  const hub = tags?.length && tags[0];
  return (
    <>
      <div className="relative flex lg:flex-1 items-center">
        <HubLink hub="all" className="flex items-center -m-1.5 p-1.5 gap-3">
          <img
            className="h-8 w-auto"
            src={config.logoPath}
            alt="whatsawesome"
          />
          <span className="sr-only">whats awesome</span>
        </HubLink>

        {hub && (
          <>
            <span className="px-3 ml-1">/</span>
            <Badge
              variant={"default"}
              className="w-auto absolute top-[4px] left-[68px] transition-all duration-0 delay-0 ease-out rounded-sm z-20  whitespace-nowrap"
            >
              <HubLink
                hub={tags[0]}
                className="flex items-center -m-1.5 px-1.5 py-2 gap-3"
              >
                <span className="font-semibold flex items-center gap-2 pr-1">
                  {hub !== config.rootHub && (
                    <NetworkIcon className="h-3.5 w-3.5 text-gray-100" />
                  )}
                  {hub !== config.rootHub
                    ? tags[0].replace(/[-]/g, " ")
                    : "whats awesome"}
                </span>
              </HubLink>
            </Badge>
          </>
        )}
      </div>
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <span className="hidden md:inline-block">explore&nbsp;</span>
              whats awesome
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    hub={component.hub}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden lg:inline-flex">
            <NavigationMenuTrigger>about</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex items-center h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <img
                        width="48"
                        height="48"
                        alt="whatsawesome"
                        src={config.logoPath}
                        className="grayscale"
                      />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        whats awesome
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Find out what is awesome about people and places. Vote
                        on what you think is awesome or add you own awesome
                        items.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="What is this?">
                  Learn why this site was created.
                </ListItem>
                <ListItem href="/docs/installation" title="FAQ">
                  Got questions? Find answers here.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Credits">
                  Find out what technology was used to create this site.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden lg:inline-flex">
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                suggest
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              developer api
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

const ListItem = ({
  className,
  title,
  children,
  href,
  hub,
  ...props
}: React.PropsWithChildren<{
  className?: string;
  title?: string;
  href?: string;
  hub?: string;
}>) => {
  //const hub = hubProp || href?.split("/")[1];
  if (href) {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            // ref={ref}
            href={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
  return (
    <li className="">
      <NavigationMenuLink asChild>
        <HubLink
          // ref={ref}
          hub={hub}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </HubLink>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";
