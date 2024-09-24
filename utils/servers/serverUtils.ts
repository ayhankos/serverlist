import { Server } from "@prisma/client";
import prisma from "@/prisma/database";

export async function getServerBySlug(slug: string): Promise<Server> {
  const server = await prisma.server.findUnique({
    where: {
      slug,
    },
  });

  if (!server) {
    throw new Error("Server not found");
  }

  return server;
}
