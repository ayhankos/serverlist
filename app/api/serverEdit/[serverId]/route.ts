import { NextResponse } from "next/server";
import prisma from "@/prisma/database";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const body = await req.json();
    const {
      name,
      image,
      description,
      detaylar,
      launchDate,
      vip,
      serverType,
      Rank,
      dcLink,
      webLink,
    } = body;

    if (!params.serverId) {
      return new NextResponse("Server ID is required", { status: 400 });
    }

    const updatedServer = await prisma.server.update({
      where: {
        id: params.serverId,
      },
      data: {
        name,
        image,
        description,
        detaylar,
        launchDate: new Date(launchDate),
        vip,
        serverType,
        Rank,
        dcLink,
        webLink,
      },
    });

    return NextResponse.json(updatedServer);
  } catch (error) {
    console.error("[SERVER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
