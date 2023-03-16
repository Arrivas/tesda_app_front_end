import { NextResponse } from "next/server";
import { verifyAuth } from "./config/verifyAuth";

export async function middleware(request) {
  const token = request.cookies.get("jwt")?.value;
  const url = request.url;

  const verifiedToken =
    token && (await verifyAuth(token).catch((err) => console.log(err)));

  if (request.nextUrl.pathname.startsWith("/login") && !verifiedToken) return;

  if (url.includes("/login") && verifiedToken)
    return NextResponse.redirect(new URL("/", url));

  // set whitelist
  if (
    (url.includes("/inventory") && !verifiedToken) ||
    (url.includes("/rborrower") && !verifiedToken)
  )
    return NextResponse.redirect(new URL("/login", url));

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", url));
  }
}

export const config = {
  matcher: ["/", "/login", "/inventory", "/rborrower"],
};
