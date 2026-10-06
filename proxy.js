import { NextResponse } from "next/server";

// Custom config redirects cannot match /_next. Preserve its former automatic
// slash handling when skipTrailingSlashRedirect is enabled for the legacy URLs.
export function proxy(request) {
  const url = new URL(request.url);
  const { pathname } = url;
  let destination;

  if (
    /^(?:\/[^/]+)*\/[^/]+\.\w+\/$/.test(pathname) &&
    !request.headers.has("x-nextjs-data")
  ) {
    destination = pathname.slice(0, -1);
  } else if (/^(?:\/[^/]+)*\/[^/.]+$/.test(pathname)) {
    destination = `${pathname}/`;
  }

  if (destination) {
    const location = `${destination}${url.search}`;
    return new NextResponse(null, {
      status: 308,
      headers: {
        Location: new URL(location, url).href,
        Refresh: `0;url=${location}`,
      },
    });
  }

  return NextResponse.next();
}

export const config = { matcher: "/_next/:path*" };
