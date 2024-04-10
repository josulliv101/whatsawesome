import { Metadata } from "next";
import { Suspense, use } from "react";

import { CardsCreateAccount } from "./CreateAccount";
// import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to vote on whats awesome.",
};

export default function AuthenticationPage() {
  return (
    <div className="max-w-md h-screen flex items-start justify-center mt-32 mx-auto">
      <Suspense fallback={<div>loading...</div>}>
        <CardsCreateAccount />
      </Suspense>
    </div>
  );
}
