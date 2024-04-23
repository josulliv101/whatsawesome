"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { tagDefinitions } from "@/lib/tags";
import { cn } from "@/lib/utils";
import { BadgeCheckIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { toSearchParamsUrl } from "./page";

const categories = ["restaurant", "coffeehouse", "hotel", "museum"];

export default function CategorySelector({ profilesByCategory = [] }: any) {
  const { hub } = useParams();
  const searchParams = useSearchParams();
  const pt = searchParams.get("pt");
  const t3 = searchParams.get("t3");
  const catalog = searchParams.get("catalog");
  const st = searchParams.get("st");
  const searchRadius = searchParams.get("searchRadius");
  const subCategories = pt ? tagDefinitions[pt]?.children : [];
  if (hub && !pt) {
    return null;
  }
  return (
    <Accordion
      defaultValue={pt ? pt : undefined}
      // value={pt ? pt : undefined}
      type="single"
      collapsible
      className="w-full"
    >
      {categories.map((category) => (
        <AccordionItem key={category} value={category}>
          <AccordionTrigger className="text-lg capitalize">
            {category}
          </AccordionTrigger>
          <AccordionContent className="flex flex-wrap gap-2">
            {tagDefinitions[category]?.tags?.sort()?.map((tag: string) => (
              <Button key={tag} variant={false ? "outline" : "ghost"} asChild>
                <Link
                  className={`hover:bg-blue-500 group hover:text-white capitalize ${t3 === tag ? "bg-blue-500 text-white" : ""}`}
                  href={`/explore/${hub}${toSearchParamsUrl({
                    // st,
                    t3: tag,
                    // catalog,
                    // searchRadius,
                    pt: category,
                  })}`}
                >
                  <BadgeCheckIcon
                    className={`h-4 w-4 mr-1.5 group-hover:text-white hover:text-white text-blue-500 opacity-80 ${t3 === tag ? "text-white" : ""}`}
                  />{" "}
                  {tag}
                </Link>
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
  return categories.map((category) => {
    return (
      <Button key={category} variant={"ghost"} asChild>
        <Link
          href={`/explore/${hub}${toSearchParamsUrl({
            // st,
            // t3,
            // catalog,
            // searchRadius,
            pt: category,
          })}`}
        >
          {category}
        </Link>
      </Button>
    );
  });
  return (
    <>
      <div className="grid md:grid-cols-12 gap-1">
        <Button
          className="col-span-4 relative"
          size="sm"
          variant="outline"
          asChild
        >
          <Link href={`/explore/${hub}`}>
            Overview
            {!pt && (
              <CheckIcon className={cn("h-4 w-4 absolute top-1 right-1")} />
            )}
          </Link>
        </Button>
        {profilesByCategory.map((category: any, index) => (
          <Button
            key={category + index}
            className="col-span-4 relative"
            size="sm"
            variant="outline"
            asChild
          >
            <Link href={`/explore/${hub}?pt=${category.tags.join(",")}`}>
              {category.label}
              {pt === category.tags?.[0] ? (
                <CheckIcon className={cn("h-4 w-4 absolute top-1 right-1")} />
              ) : (
                ""
              )}
            </Link>
          </Button>
        ))}
        <Button className="col-span-4" size="sm" variant="outline" asChild>
          <Link href={`/explore/${hub}`}>more</Link>
        </Button>
      </div>
      {subCategories && (
        <>
          <div className="grid md:grid-cols-12 gap-1 mt-6">
            {subCategories.map((subCategory: string, index) => {
              return (
                <Button
                  key={subCategory + index}
                  className="col-span-3 relative"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    toast(
                      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">
                          Functionality not yet implemented.
                        </code>
                      </pre>
                    )
                  }
                >
                  {subCategory}
                </Button>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
