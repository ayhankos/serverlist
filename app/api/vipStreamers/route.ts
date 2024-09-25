import { NextResponse } from "next/server";
import prisma from "@/prisma/database";

export async function GET() {
  const servers = await prisma.streamer.findMany({
    where: {
      vip: "vip",
    },
  });

  return NextResponse.json(servers);
}
