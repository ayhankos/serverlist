import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const config = {
  runtime: "edge",
};

export async function DELETE(request: Request) {
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
    const { serverId } = await request.json();
    console.log(serverId);

    await prisma.streamer.delete({
      where: {
        id: serverId,
      },
    });

    return new Response("Streamer deleted successfully", {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error("Error deleting streamer:", error);
    return new Response("Streamer deletion error: " + error.message, {
      status: 500,
      headers,
    });
  }
}
