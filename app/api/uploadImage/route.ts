import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const formData = await req.formData();
  const files = formData.getAll("files");

  if (files.length === 0) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const formDataToSend = new FormData();

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${new Date().getTime()}${Math.random()
      .toString(36)
      .substring(7)}.${file.type.split("/")[1]}`;

    formDataToSend.append("file", new Blob([buffer]), filename);
  }

  try {
    const response = await fetch("https://pvpserverlar.tr/upload.php", {
      method: "POST",
      body: formDataToSend,
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const result = await response.json();

    if (response.ok) {
      return NextResponse.json(
        { message: "Files uploaded successfully", result },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: result.message || "Upload failed" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.log("Error occurred while sending files to the PHP server:", error);
    return NextResponse.json(
      { error: "Error occurred while sending files" },
      { status: 500 }
    );
  }
};
