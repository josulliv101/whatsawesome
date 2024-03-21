import { PropsWithChildren } from "react";
// import Header from "@/app/components/header";

import Header from "@/components/Header";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {/* <Breadcrumb /> */}
      {children}
      <Footer />
    </>
  );
}
