import { NextRequest, NextResponse } from "next/server";

const CWP_UPLOAD_URL = process.env.NEXT_PUBLIC_UPLOAD_URL as string;

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const files = formData.getAll("files") as File[];

  if (files.length === 0) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const responses = [];

  for (const file of files) {
    const newFormData = new FormData();
    newFormData.append("file", file);

    try {
      const response = await fetch(CWP_UPLOAD_URL, {
        method: "POST",
        body: newFormData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      responses.push(result);
    } catch (error) {
      console.error("Error uploading file:", error);
      responses.push({
        status: "error",
        message: "Failed to upload file",
        file: file.name,
      });
    }
  }

  return NextResponse.json(
    { Message: "Processed", responses },
    { status: 201 }
  );
};
