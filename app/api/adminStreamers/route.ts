import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const config = {
  runtime: "edge",
};

export async function GET(req: NextRequest) {
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
    const streamers = await prisma.streamer.findMany();

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
