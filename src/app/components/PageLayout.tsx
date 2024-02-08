import { PropsWithChildren } from "react";
// import Header from "@/app/components/header";
import SystemInfo from "@/app/components/server-info";
import Footer from "@/app/components/footer";
import Header from "@/components/Header";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/Breadcrumb";

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {/* <Breadcrumb /> */}
      {children}
      <Footer />
      <SystemInfo />
    </>
  );
}
