import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  const path = request.nextUrl.searchParams.get("path") || "/";
  revalidatePath(path);

  return NextResponse.json({ revalidated: true, now: Date.now() });
};
