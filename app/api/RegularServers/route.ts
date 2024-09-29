import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const vip = searchParams.get("vip");

  const offset = (page - 1) * pageSize;

  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Cache-Control", "no-store, max-age=0");

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers });
  }

  try {
    const streamers = await prisma.streamer.findMany({
      where: {
        vip: vip || undefined,
      },
      skip: offset,
      take: pageSize,
    });

    return NextResponse.json(streamers, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error fetching streamers:", error);
    return NextResponse.json(
      { error: "Failed to fetch streamers" },
      { status: 500, headers }
    );
  }
}
