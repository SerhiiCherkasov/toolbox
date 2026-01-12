import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const res = NextResponse.next();

  res.headers.set("x-current-path", req.nextUrl.pathname);

  return res;
}
