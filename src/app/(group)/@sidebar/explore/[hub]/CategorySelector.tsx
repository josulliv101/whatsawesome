"use client";

import { Button } from "@/components/ui/button";
import { tagDefinitions } from "@/lib/tags";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function CategorySelector({ profilesByCategory = [] }: any) {
  const { hub } = useParams();
  const searchParams = useSearchParams();
  const pt = searchParams.get("pt");
  const subCategories = pt ? tagDefinitions[pt]?.children : [];
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
        {profilesByCategory.map((category: any) => (
          <Button
            key={category}
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
            {subCategories.map((subCategory: string) => {
              return (
                <Button
                  key={subCategory}
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
