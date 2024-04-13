import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { APIResponse, convertTagMapToTags } from "@/lib/firebase";
import { createSessionCookie } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const docs = await convertTagMapToTags();
  return NextResponse.json<APIResponse<string>>({
    success: true,
    data: JSON.stringify(docs),
  });
}
