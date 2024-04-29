import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { APIResponse, convertTagMapToTags } from "@/lib/firebase";
import { createSessionCookie } from "@/lib/auth";
import { searchLocations, searchTopAoeByTagFilter } from "@/lib/search";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const docs = await searchLocations(query || "");
  return NextResponse.json<APIResponse<string>>({
    success: true,
    data: docs,
  });
}
