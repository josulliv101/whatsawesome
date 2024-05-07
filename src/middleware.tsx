import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getHubTags } from "./lib/tags";
import { auth, getCurrentUser } from "./lib/auth";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest, params: any) {
  const {
    nextUrl: { pathname },
  } = request;

  const url = pathname.substring(1);

  const cookieValue = request.cookies.get("uid");

  // const decodedIdToken = await auth.verifySessionCookie(sess!);
  console.log("middleware uid", cookieValue);
  // if (cookieValue?.value) {
  //   const [
  //     base,
  //     hub = "index",
  //     pt = "index",
  //     t3 = "index",
  //     distance = 0,
  //     uid = cookieValue?.value || "index",
  //   ] = url.split("/");
  //   const fullUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/${base}/${hub}/${pt}/${t3}/${distance}/${uid}`;
  //   console.log("tokens", base, hub, pt, t3, distance, uid, ":", fullUrl);

  //   const response = NextResponse.rewrite(fullUrl);

  //   return response;
  // }

  const response = NextResponse.next();
  // response.cookies.set("myCookie", "123");

  // if (!filterCookie) {
  //   response.cookies.set({
  //     name: cookieName,
  //     value: hubUrl.tags.join(","),
  //     path: "/",
  //   });
  // }
  //   if (false && primaryTag?.value === "place") {
  //     return NextResponse.redirect("http://localhost:3000/all/place");
  //   } else if (primaryTag?.value) {
  //     console.log("middleware primaryTag", primaryTag);
  //     return NextResponse.rewrite(
  //       "https://whatsawesome.vercel.app/all/" + primaryTag?.value
  //     );
  //   }
  return response;
}

/*
export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API

  // const capturingRegex = /(?<animal>place|person)/gi;
  //const found = paragraph.match(capturingRegex);

  // if (request.nextUrl.pathname.match(capturingRegex)) {
  //   return NextResponse.rewrite(new URL("/chicago/person", request.url));
  // }

  const isPathPlace = request.nextUrl.pathname.includes("/place");
  const isPathPerson = request.nextUrl.pathname.includes("/person");
  const primaryTag = request.cookies.get("primary-tag");

  console.log("primary-tag", primaryTag);
  console.log("middlewar", request.nextUrl.pathname);

  const response = NextResponse.next();

  if (!request.cookies.has("primary-tag")) {
    let primaryTag = "person";
    if (isPathPlace) {
      primaryTag = "place";
    }
    // response.cookies.set("primary-tag", primaryTag);
    response.cookies.set({
      name: "primary-tag",
      value: primaryTag,
      path: "/",
    });
  } else if (isPathPlace) {
    response.cookies.set({
      name: "primary-tag",
      value: "place",
      path: "/",
    });
  } else if (isPathPerson) {
    response.cookies.set({
      name: "primary-tag",
      value: "person",
      path: "/",
    });
  }
  return response;
}
*/
export const config = {
  matcher: ["/foobar/:hub*"],
};
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     {
//       source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
//       missing: [
//         { type: "header", key: "next-router-prefetch" },
//         { type: "header", key: "purpose", value: "prefetch" },
//       ],
//     },
//   ],
// };
