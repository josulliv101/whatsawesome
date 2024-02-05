import { PropsWithChildren, ReactNode } from "react";

export default function Layout({
  children,
  content,
  params,
}: PropsWithChildren<{ params: any; content: ReactNode }>) {
  return (
    <div>
      {/* <div>params: {JSON.stringify(content)}</div> */}

      <div>
        {content}
        {children}
      </div>
    </div>
  );
}
