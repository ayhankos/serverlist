export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const servers = await prisma.streamer.findMany({
    where: {
      vip: "vip",
    },
  });

  return NextResponse.json(servers);
}
