import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { streamerId } = await request.json();
    console.log("Deleting streamer id:", streamerId);
    await prisma.streamer.delete({
      where: {
        id: streamerId,
      },
    });
    return new Response("Streamer deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting streamer:", error);
    return new Response("Streamer deletion error: " + error, { status: 500 });
  }
}
