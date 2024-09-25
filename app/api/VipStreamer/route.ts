import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const streamerData = {
      name: body.name,
      description: body.description,
      image: body.image,
      dcLink: body.dcLink,
      ytLink: body.ytLink,
      vip: body.vip,
    };

    const newStreamer = await prisma.streamer.create({
      data: streamerData,
    });

    console.log("Streamer successfully created:", newStreamer);
    return NextResponse.json(
      { message: "Streamer successfully created", streamerData: newStreamer },
      { status: 201 }
    );
  } catch (error) {
    console.error("Streamer creation failed:", error);
    return NextResponse.json(
      { error: "Streamer creation failed" },
      { status: 500 }
    );
  }
}
