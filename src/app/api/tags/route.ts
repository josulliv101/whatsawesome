import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { APIResponse, convertTagMapToTags } from "@/lib/firebase";
import { createSessionCookie } from "@/lib/auth";
import { searchTopAoeByTagFilter } from "@/lib/search";

export async function GET(request: NextRequest) {
  const docs = await searchTopAoeByTagFilter("boston", [
    "place",
    "restaurant",
    "steak",
  ]);
  return NextResponse.json<APIResponse<string>>({
    success: true,
    data: docs,
  });
}
