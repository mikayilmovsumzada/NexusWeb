import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, validSession } from "@/server/auth";
import { isSameOrigin, seeOther } from "@/server/request";
import { deleteMessage, setRead } from "@/server/messages";

/** Inbox actions from the admin page: mark read/unread, delete. */
export async function POST(request: NextRequest) {
  // The proxy already checked the session; check again here (defence in depth).
  if (!isSameOrigin(request.headers) || !validSession(request.cookies.get(SESSION_COOKIE)?.value)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const form = await request.formData().catch(() => null);
  const id = Number(form?.get("id"));
  const action = form?.get("action");
  const filter = form?.get("filter") === "unread" ? "?filter=unread" : "";

  if (Number.isSafeInteger(id) && id > 0) {
    if (action === "read") setRead(id, true);
    else if (action === "unread") setRead(id, false);
    else if (action === "delete") deleteMessage(id);
  }
  return seeOther(`/admin${filter}`);
}
