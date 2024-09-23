import { NextResponse } from "next/server";
import prisma from "@/prisma/database";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  try {
    const server = await prisma.vipServer.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!server) {
      return NextResponse.json({ error: "Sunucu bulunamadı" }, { status: 404 });
    }
    return NextResponse.json({
      name: server.name,
      description: server.description,
      feature: server.feature,
      playerCount: server.playercount,
      launchDate: server.launchDate,
      image: server.image,
    });
  } catch (error) {
    console.error("Sunucu bilgileri alınamadı:", error);
    return NextResponse.json(
      { error: "Sunucu bilgileri alınamadı" },
      { status: 500 }
    );
  }
}
