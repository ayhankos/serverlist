import { NextResponse } from "next/server";
import prisma from "@/prisma/database";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const server = await prisma.server.findUnique({
      where: {
        id: id,
      },
    });

    if (!server) {
      return NextResponse.json({ error: "Sunucu bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({
      id: server.id,
      name: server.name,
      description: server.description,
      playerCount: server.playercount,
      launchDate: server.launchDate,
      image: server.image,
      vip: server.vip,
    });
  } catch (error) {
    console.error("Sunucu bilgileri alınamadı:", error);
    return NextResponse.json(
      { error: "Sunucu bilgileri alınamadı" },
      { status: 500 }
    );
  }
}
