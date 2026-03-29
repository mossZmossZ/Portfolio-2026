import { NextResponse } from "next/server";
import { resolveMediaUrl } from "../../../../lib/media-catalog";

function withSecurityHeaders(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const pathSegments = resolvedParams.path || [];
  const pathKey = pathSegments.join("/");

  const { url } = resolveMediaUrl(pathKey);

  if (!url) {
    return withSecurityHeaders(NextResponse.json(
      {
        error: "Media asset not available"
      },
      { status: 404 }
    ));
  }

  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept");

  return withSecurityHeaders(response);
}
