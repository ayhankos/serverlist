import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/database";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const { serverId, clickType } = await request.json();

  try {
    const server = await prisma.server.findUnique({
      where: { id: serverId },
    });

    if (!server) {
      return NextResponse.json(
        { message: "Server not found" },
        { status: 404 }
      );
    }

    const updateData =
      clickType === "dc"
        ? { dcLinkClicks: { increment: 1 } }
        : { webLinkClicks: { increment: 1 } };

    const updatedServer = await prisma.server.update({
      where: { id: serverId },
      data: {
        ...updateData,
        totalClicks: { increment: 1 },
      },
    });

    return NextResponse.json(updatedServer, { status: 200 });
  } catch (error) {
    console.error("Error tracking click:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
