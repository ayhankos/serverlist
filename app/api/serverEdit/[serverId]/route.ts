import { NextResponse } from "next/server";
import prisma from "@/prisma/database";
import fs from "fs";
import path from "path";

const deleteOldImage = async (imagePath: string) => {
  try {
    const filename = imagePath.split("/").pop();

    if (!filename) return;

    const fullPath = path.join(process.cwd(), "public", "uploads", filename);

    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
      console.log(`Successfully deleted old image: ${fullPath}`);
    }
  } catch (error) {
    console.error("Error deleting old image:", error);
  }
};

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

    const currentServer = await prisma.server.findUnique({
      where: {
        id: params.serverId,
      },
      select: {
        image: true,
      },
    });

    if (currentServer && currentServer.image !== image && currentServer.image) {
      await deleteOldImage(currentServer.image);
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
