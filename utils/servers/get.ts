import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServers() {
  const streamers = await prisma.server.findMany();
  prisma.$disconnect();
  return streamers;
}
