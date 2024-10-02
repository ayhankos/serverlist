import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path, { join } from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const adLocations = [
  "Giris sayfasi sol",
  "Giris sayfasi sag",
  "Ana sayfa sol",
  "Ana sayfa sag",
  "Ana sayfa ust",
  "Ana sayfa alt",
];

export async function GET() {
  try {
    const ads = await prisma.advertisement.findMany();
    const response = adLocations.map((location) => ({
      location,
      ad: ads.find((ad) => ad.location === location) || null,
    }));
    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to fetch advertisements:", error);
    return NextResponse.json(
      { error: "Failed to fetch advertisements" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    const location = formData.get("location") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!location || !adLocations.includes(location)) {
      return NextResponse.json(
        { error: "Invalid location specified" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), "public", "adds");
    await mkdir(uploadDir, { recursive: true });

    const filename = file.name;
    const filePath = join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const imagePath = `/adds/${filename}`;

    const ad = await prisma.advertisement.upsert({
      where: { location },
      update: { imagePath },
      create: { location, imagePath },
    });

    return NextResponse.json({ location, ad }, { status: 200 });
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
