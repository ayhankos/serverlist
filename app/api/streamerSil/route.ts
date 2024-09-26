import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { streamerId } = await request.json();
    console.log(streamerId);
    await prisma.streamer.delete({
      where: {
        id: streamerId,
      },
    });
    return new Response("Company deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Company deletion error: " + error, { status: 500 });
  }
}
