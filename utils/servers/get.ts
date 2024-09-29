import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServers() {
  const servers = await prisma.server.findMany();
  console.log(servers);
  prisma.$disconnect();
  return servers;
}
