import { PropsWithChildren } from "react";
import Header from "@/app/components/header";
import SystemInfo from "@/app/components/server-info";
import Footer from "@/app/components/footer";

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <Header />
      <div className="page">
        {children}
        <Footer />
        <SystemInfo />
      </div>
    </main>
  );
}
