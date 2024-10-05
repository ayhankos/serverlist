import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data) {
      return NextResponse.json({ error: "No data " }, { status: 400 });
    }

    await prisma.mainAdvertisementTextSol.deleteMany();

    const res = await prisma.mainAdvertisementTextSag.create({
      data: {
        title: data.title,
        date: data.date,
        description: data.description,
      },
    });
    return NextResponse.json({
      message: "Main Advertisement created",
      data: res,
    });
  } catch (error) {
    console.error("Failed to create main advertisement:", error);
    return NextResponse.json(
      { error: "Failed to create main advertisement" },
      { status: 500 }
    );
  }
}
