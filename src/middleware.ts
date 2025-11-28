// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
//
// export function proxy(request: NextRequest) {
//   // Log the current request pathname
//   console.log("Current path:", request.nextUrl.pathname);
//   return NextResponse.next();
// }
//
// export const config = {
//   matcher: [
//     // match all routes except static files and APIs
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//   ],
// };

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log("Current path:", request);

  return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}
