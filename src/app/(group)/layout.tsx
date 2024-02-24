import TabNav from "@/components/TabNav";
import { PropsWithChildren, ReactNode } from "react";

export default function Layout({
  children,
  content,
  params,
}: PropsWithChildren<{ params: any; content: ReactNode }>) {
  return (
    <>
      {/* <div>params: {JSON.stringify(content)}</div> */}

      {content}

      <main className="flex min-h-screen max-w-7xl mx-auto flex-col items-start justify-start px-4  lg:px-8 py-16 ">
        <div className="w-full flex items-center justify-between pb-16">
          <div className="flex items-center gap-4">
            <TabNav profile={undefined} />
          </div>
        </div>{" "}
        {children}
      </main>
    </>
  );
}
