import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { APIResponse, convertTagMapToTags } from "@/lib/firebase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");
  const tag = searchParams.get("tag");
  console.log("cache endpoint", tag, path);
  if (tag) {
    revalidateTag(tag);
  }
  if (path) {
    revalidatePath(path);
  }
  return NextResponse.json<APIResponse<string | null>>({
    success: true,
    data: null,
  });
}
