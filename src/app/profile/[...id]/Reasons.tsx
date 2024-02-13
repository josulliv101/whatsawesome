"use client";

import { useAuthContext } from "@/components/AuthContext";

export default function Reasons() {
  const user = useAuthContext();
  return <div>reasons</div>;
}
