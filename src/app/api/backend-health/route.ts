import { NextResponse } from "next/server";

const DEFAULT_HEALTHCHECK_URL = "https://api-sushinads.cryptara.world/health";

export const dynamic = "force-dynamic";

export async function GET() {
  const healthUrl =
    process.env.API_HEALTHCHECK_URL ||
    process.env.NEXT_PUBLIC_API_HEALTHCHECK_URL ||
    DEFAULT_HEALTHCHECK_URL;

  try {
    const response = await fetch(healthUrl, {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { healthy: false, statusCode: response.status, source: healthUrl },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { healthy: true, statusCode: response.status, source: healthUrl },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { healthy: false, statusCode: 0, source: healthUrl },
      { status: 503 }
    );
  }
}
