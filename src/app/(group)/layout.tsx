import Image from "next/image";
import TabNav from "@/components/TabNav";
import { PropsWithChildren, ReactNode } from "react";
import { GlobeIcon } from "lucide-react";

export default function Layout({
  children,
  content,
  params,
}: PropsWithChildren<{ params: any; content: ReactNode }>) {
  return (
    <>
      {/* <div>params: {JSON.stringify(content)}</div> */}

      {content}

      <main className="flex min-h-screen max-w-7xl mx-auto flex-col items-start justify-start px-4  lg:px-8 py-4 ">
        <div className="w-full flex_ items-center justify-between pb-16">
          <div className="flex items-center justify-end gap-4">
            {/* <TabNav profile={undefined} /> */}
            <div className="shadow-sm px-5 py-4 bg-white flex items-center gap-4 max-w-md">
              <Image
                alt="Constant Contact, Inc"
                width="48"
                height="48"
                src="/constant-contact.png"
              />
              <div>
                <a
                  className="underline font-semibold"
                  href="https://www.constantcontact.com"
                >
                  Constant Contact, Inc
                </a>
                <br />
                <span className="font-semibold_">
                  sponsor of blue mushroom{" "}
                  <GlobeIcon className="h-4 w-4 text-muted-foreground mr-1 relative top-[-1px] inline-flex" />
                  Boston
                </span>{" "}
              </div>
            </div>
          </div>
        </div>{" "}
        {children}
      </main>
    </>
  );
}
