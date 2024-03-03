import Image from "next/image";
import TabNav from "@/components/TabNav";
import { PropsWithChildren, ReactNode } from "react";
import { GlobeIcon } from "lucide-react";
import SponsorCard from "@/components/SponsorCard";

export default function Layout({
  children,
  content,
  params,
}: PropsWithChildren<{ params: any; content: ReactNode }>) {
  return (
    <>
      {/* <div>params: {JSON.stringify(content)}</div> */}

      {content}

      <main className="flex min-h-screen  max-w-7xl mx-auto flex-col items-start justify-start px-4  lg:px-8 py-4 mt-16">
        {children}
      </main>
    </>
  );
}
