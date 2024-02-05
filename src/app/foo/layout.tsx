import { PropsWithChildren, ReactNode } from "react";

export default function Default({
  children,

  params,
}: PropsWithChildren<{ content: ReactNode; params: any }>) {
  return (
    <div>
      <div>params: {JSON.stringify(params)}</div>
      <div>layout</div>
      <div>{children}</div>
    </div>
  );
}
