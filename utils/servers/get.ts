import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetVipServers = async (
  page: number = 1,
  pageSize: number = 10
) => {
  const offset = (page - 1) * pageSize;
  const servers = await prisma.vipServer.findMany({
    skip: offset,
    take: pageSize,
  });
  return servers;
};

export const GetRegularServers = async (
  page: number = 1,
  pageSize: number = 10
) => {
  const offset = (page - 1) * pageSize;
  const servers = await prisma.regularServer.findMany({
    skip: offset,
    take: pageSize,
  });
  return servers;
};
