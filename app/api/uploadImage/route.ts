import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename =
      file.name.replace(/\.[^/.]+$/, "") +
      "-" +
      uniqueSuffix +
      path.extname(file.name);

    const uploadUrl = "https://pvpserverlar.tr/upload.php";

    const uploadFormData = new FormData();
    uploadFormData.append("image", new Blob([buffer]), filename);

    const response = await axios.post(uploadUrl, uploadFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const imagePath = response.data.imagePath;
    return NextResponse.json({ imagePath }, { status: 200 });
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
