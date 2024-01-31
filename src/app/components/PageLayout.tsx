import { PropsWithChildren } from "react";
// import Header from "@/app/components/header";
import SystemInfo from "@/app/components/server-info";
import Footer from "@/app/components/footer";
import Header from "@/components/Header";

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <SystemInfo />
    </>
  );
}
