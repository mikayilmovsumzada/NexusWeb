import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, logout } from "@/server/auth";
import { isSameOrigin } from "@/server/request";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request.headers)) return new NextResponse("Forbidden", { status: 403 });
  logout(request.cookies.get(SESSION_COOKIE)?.value);
  const res = new NextResponse(null, { status: 303, headers: { Location: "/admin/login?signedOut=1", "Cache-Control": "no-store" } });
  res.cookies.set({ name: SESSION_COOKIE, value: "", path: "/", maxAge: 0, httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production" });
  return res;
}
