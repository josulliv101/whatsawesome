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
      {children}
    </>
  );
}
