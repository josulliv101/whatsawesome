"use client";

import * as React from "react";
import Link from "next/link";
import { ThumbsDownIcon, Globe as NetworkIcon, Slash } from "lucide-react";
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
import { config, isRootHub } from "@/lib/config";
import { Badge } from "./ui/badge";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useIsMounted } from "./useIsMounted";
import { BreadcrumbSeparator } from "./ui/breadcrumb";
import { Separator } from "./ui/separator";

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
    href: "/tags",
    description: "Explore by mixing and matching tags.",
  },
  {
    title: "NYC",
    href: "/new-york-city/person/comedian",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function NavMenu({
  enableLogoAnimation,
  forcePlayAnimation,
  setForcePlayAnimation,
  children,
}: React.PropsWithChildren<{
  enableLogoAnimation?: boolean;
  forcePlayAnimation?: boolean;
  setForcePlayAnimation?: Dispatch<SetStateAction<boolean>>;
}>) {
  const { tags, id: profileId } = useParams();
  const isMountedFn = useIsMounted();
  const isMounted = isMountedFn();
  const [animationState, setAnimationState] = useState(
    "" //, enableLogoAnimation ? "" : "disabled"
  );
  // const refLogo = useRef(null);
  const hub = tags?.length ? tags[0] : "all";

  useEffect(() => {
    if (isMounted) {
      setAnimationState(enableLogoAnimation ? "" : "disabled");
    }
  }, [isMounted]);

  return (
    <>
      <div className="relative flex lg:flex-0 items-center gap-0">
        <Link
          href="/"
          className="text-xs px-2 py-1 rounded-md  bg-primary_ border-0 text-primary font-normal"
        >
          20 Mushrooms
        </Link>
        <Separator orientation="vertical" className="h-4 mx-1" />
        <span className="text-xs pl-1.5 font-normal opacity-60 text-gray-700 ">
          ai-powered recommendation engine
        </span>

        <Link
          href="/"
          className="flex_ relative _top-[2px] _p-1.5 gap-3 hidden"
        >
          <img
            // ref={refLogo}
            className={`h-4 w-auto origin-bottom ${forcePlayAnimation ? "animate-rubberBandJumpNoDelay" : ""} ${isMounted && !animationState && enableLogoAnimation ? "animate-rubberBandJump" : `no-jump-${animationState}-${enableLogoAnimation}`}`}
            src={"/cute-mushroom-no-shadow.png"}
            alt="whatsawesome"
            onAnimationEnd={(ev) => {
              console.log("animation", ev);
              setAnimationState("done");
              setForcePlayAnimation?.(false);
            }}
          />
          {/* <div className="animate-rubberBandJumpShadow__ bg-black dark:bg-blue-700/90 h-[2px] w-[27.0px] origin-bottom rounded-full absolute top-[29.5px] left-[2px]" /> */}
          <span className="sr-only">20 mushrooms</span>
        </Link>

        {
          <>
            {/* <span className="px-3 ml-1 w-8 pr-4 block_ hidden">
              <Slash className="h-4 w-4 mr-4" />{" "}
            </span>
            <Badge
              variant={"secondary"}
              className="w-auto bg-white absolute top-[-3px] left-[36px] transition-all duration-0 delay-0 ease-out rounded-sm z-20  whitespace-nowrap"
            >
              <Link
                href={isRootHub(hub) ? `/` : `/explore/${hub}`}
                className="flex items-center -m-1.5 px-1.5 py-2 gap-3"
              >
                <span
                  className={`capitalize font-semibold flex items-center gap-2 ${hub !== config.rootHub ? "pr-[0px]" : "pr-0"}`}
                >
                  {!isRootHub(hub) && (
                    <NetworkIcon className="h-3.5 w-3.5 text-gray-100 dark:text-gray-900" />
                  )}
                  {!isRootHub(hub) ? (
                    tags[0].replace(/[-]/g, " ")
                  ) : (
                    <span className="hidden">20 Mushrooms</span>
                  )}
                </span>
              </Link>
            </Badge> */}
          </>
        }
      </div>
      <NavigationMenu className="hidden lg:block ml-[16%]">
        <NavigationMenuList className="hidden">
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <span className="hidden md:inline-block">explore&nbsp;</span>
              {/* whats awesome */}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="z-[99999]">
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
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex items-center h-full w-full select-none flex-col justify-between rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/about"
                    >
                      <img
                        width="80"
                        height="80"
                        alt="whatsawesome"
                        src={config.logoPath}
                        className="grayscale pt-4"
                      />
                      {/* <div className="hidden mb-2 mt-4 text-lg font-medium">
                        whats awesome
                      </div> */}
                      <p className="text-md leading-snug text-muted-foreground">
                        The what&#39;s awesome mission is to answer the question
                        of what makes stuff awesome.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/about" title="What is this?">
                  Learn why this site was created.
                </ListItem>
                <ListItem href="/faq" title="FAQ">
                  Got questions? Find answers here.
                </ListItem>
                <ListItem href="/about/technology" title="Technology">
                  Find out what technology was used to create this site.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden lg:inline-flex">
            <Link href="/explore/boston" legacyBehavior passHref>
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
