import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const serverData = {
      name: body.name,
      description: body.description,
      playercount: body.playerCount,
      vip: body.vip,
      launchDate: new Date(body.launchDate),
      image: body.image,
      serverType: body.serverType,
      Rank: body.Rank,
    };

    const newServer = await prisma.server.create({
      data: serverData,
    });

    console.log("Server successfully created:", newServer);
    return NextResponse.json(
      { message: "Server successfully created", serverData: newServer },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server creation failed:", error);
    return NextResponse.json(
      { error: "Server creation failed" },
      { status: 500 }
    );
  }
}
