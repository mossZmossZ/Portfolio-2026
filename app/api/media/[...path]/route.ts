import { NextResponse } from "next/server";
import { resolveMediaUrl } from "../../../../lib/media-catalog";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const pathSegments = resolvedParams.path || [];
  const pathKey = pathSegments.join("/");

  const { url, envKey } = resolveMediaUrl(pathKey);

  if (!url) {
    return NextResponse.json(
      {
        error: "Media key not found",
        key: pathKey
      },
      { status: 404 }
    );
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return NextResponse.json(
      {
        error: "Invalid media URL",
        key: pathKey,
        expectedEnv: envKey
      },
      { status: 500 }
    );
  }

  return NextResponse.redirect(url);
}
