import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return Response.json({ message: "Hello World!!!" });
}

// export async function HEAD(request: NextRequest) {}

export async function POST(request: NextRequest) {}

// export async function PUT(request: NextRequest) {}

// export async function DELETE(request: NextRequest) {}

// export async function PATCH(request: NextRequest) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and set the appropriate Response `Allow` header depending on the other methods defined in the Route Handler.
// export async function OPTIONS(request: NextRequest) {}
