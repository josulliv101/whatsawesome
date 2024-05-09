import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { APIResponse, convertTagMapToTags } from "@/lib/firebase";
import { createSessionCookie } from "@/lib/auth";
import { searchTopAoeByRadius, searchTopAoeByTagFilter } from "@/lib/search";

export async function GET(request: NextRequest) {
  const docs = await searchTopAoeByRadius(
    "boston",
    20,
    ["restaurant", "burger"],
    20,
    1,
    0
  );
  return NextResponse.json<APIResponse<string>>({
    success: true,
    data: docs,
  });
}
