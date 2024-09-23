import { NextResponse } from "next/server";
import prisma from "@/prisma/database";

export async function GET() {
  try {
    const servers = await prisma.server.findMany();
    return NextResponse.json(servers);
  } catch (error) {
    console.error("Sunucu listesi alınamadı:", error);
    return NextResponse.json(
      { error: "Sunucu listesi alınamadı" },
      { status: 500 }
    );
  }
}
