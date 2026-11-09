import { NextResponse, type NextRequest } from "next/server";
import { adminEnabled, ipAllowed, login, sessionCookie } from "@/server/auth";
import { clientIp, isSameOrigin, seeOther } from "@/server/request";

export async function POST(request: NextRequest) {
  const ip = clientIp(request.headers);
  if (!adminEnabled()) return new NextResponse("Not Found", { status: 404 });
  if (!ipAllowed(ip) || !isSameOrigin(request.headers)) return new NextResponse("Forbidden", { status: 403 });

  const form = await request.formData().catch(() => null);
  const password = form?.get("password");
  const code = form?.get("code");
  if (typeof password !== "string" || typeof code !== "string") return seeOther("/admin/login?error=invalid");

  const result = await login(password, code, ip, request.headers.get("user-agent") ?? "");
  if (!result.ok) return seeOther(`/admin/login?error=${result.reason}`);

  const res = new NextResponse(null, { status: 303, headers: { Location: "/admin", "Cache-Control": "no-store" } });
  res.cookies.set(sessionCookie(result.token));
  return res;
}
