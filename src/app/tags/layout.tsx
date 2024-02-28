import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import {
  collectionGroup,
  query,
  where,
  getDocs,
  limit,
  or,
} from "firebase/firestore";
import Link from "next/link";
import { PropsWithChildren } from "react";

const tags = [
  "burger",
  "steak",
  "wings",
  "drink",
  "atmosphere",
  "menu",
  "food",
  "service",
  "location",
];

const peopleTags = [
  "civil-rights",
  "leader",
  "champion",
  "revolutionize",
  "charitable",
  "longevity",
  "clutch",
  "pushed-boundaries",
  "captivating",
  "genuine",
  "unique",
  "accomplished",
  "outspoken",
  "social-change",
  "authentic",
  "powerful",
  "versatile",
  "trailblazing",
  "groundbreaking",
  "inspiring",
  "influential",
  "resilient",
  "conviction",
];
// Celebrating why things are awesome
export default async function Layout({ children }: PropsWithChildren) {
  return (
    <main
      className={cn(
        "relative flex min-h-screen max-w-7xl mx-auto mt-0 flex-col items-start justify-start px-4 py-6"
      )}
    >
      <div className="flex_ hidden flex-row flex-wrap gap-4 px-4 py-6 lg:px-8 lg:py-12">
        places:{" "}
        {tags.sort().map((tag) => (
          <Button key={tag} size="sm" asChild>
            <Link href={`/tags/${tag}`}>{tag}</Link>
          </Button>
        ))}
      </div>
      <div className="flex_ hidden flex-row flex-wrap gap-4 px-4 py-6 lg:px-8 lg:py-12">
        people:{" "}
        {peopleTags.sort().map((tag) => (
          <Button key={tag} size="sm" asChild>
            <Link href={`/tags/${tag}`}>{tag}</Link>
          </Button>
        ))}
      </div>
      {children}
    </main>
  );
}
