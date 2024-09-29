import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const runtime = "edge";

export default async function handler(req: NextRequest) {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Cache-Control", "no-store, max-age=0");

  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers });
  }

  try {
    const servers = await prisma.server.findMany();

    return NextResponse.json(servers, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      { error: "An error occurred while fetching servers" },
      {
        status: 500,
        headers,
      }
    );
  }
}
