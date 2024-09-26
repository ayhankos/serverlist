import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req: any, res: any) => {
  const formData = await req.formData();

  const files = formData.getAll("files");
  if (files.length === 0) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const responses = [];
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${new Date().getTime()}${Math.random()
      .toString(36)
      .substring(7)}.${file.type.split("/")[1]}`;
    console.log(filename);
    try {
      await writeFile(
        path.join(process.cwd(), "public/uploads/" + filename),
        buffer
      );
      responses.push({ file: filename, status: "Success" });
    } catch (error) {
      console.log("Error occurred ", error);
      responses.push({ file: filename, status: "Failed" });
    }
  }

  return NextResponse.json(
    { Message: "Processed", responses },
    { status: 201 }
  );
};
