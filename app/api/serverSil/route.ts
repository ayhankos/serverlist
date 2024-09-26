import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { serverId } = await request.json();
    console.log(serverId);
    await prisma.server.delete({
      where: {
        id: serverId,
      },
    });
    return new Response("Company deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Company deletion error: " + error, { status: 500 });
  }
}
