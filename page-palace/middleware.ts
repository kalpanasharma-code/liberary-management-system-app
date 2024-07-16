
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ["/login", "/register"];
  const token = request.cookies.get("token")?.value || "";
 
  const isTokenExpired = (token: string) => {
    const expirationTimestamp = getTokenExpirationTimestamp(token);
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
 
    return expirationTimestamp && expirationTimestamp < currentTimestamp;
  };
 
  // If the user is trying to access a public path and they are authenticated, redirect to home
  if (publicPaths.includes(path) && token && !isTokenExpired(token)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
 
  // If the user is trying to access a protected path and they are not authenticated, redirect to login
  if (!publicPaths.includes(path) && (!token || isTokenExpired(token))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
 
  // Allow the request to proceed
  return NextResponse.next();
}
 
export const config = {
  matcher: ["/", "/login", "/register"], // Adjust the paths according to your needs
};
 
// Function to extract expiration timestamp from the token
function getTokenExpirationTimestamp(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
 