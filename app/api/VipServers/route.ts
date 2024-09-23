import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const vip = searchParams.get("vip") === "true";

  const offset = (page - 1) * pageSize;

  try {
    const servers = await prisma.server.findMany({
      where: {
        vip: vip,
      },
      skip: offset,
      take: pageSize,
    });

    return NextResponse.json(servers);
  } catch (error) {
    console.error("Error fetching servers:", error);
    return NextResponse.json(
      { error: "Failed to fetch servers" },
      { status: 500 }
    );
  }
}
