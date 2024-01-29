import { PageLayout } from "./components/PageLayout";
import "./globals.css";

import { PropsWithChildren } from "react";

export const metadata = {
  title: "Next.js App Router + React Server Components Demo",
  description: "Hacker News clone built with the Next.js App Router.",
  robots: {
    index: true,
    follow: true,
  },
};

// export const viewport = {
//   themeColor: "#ffa52a",
// };

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
