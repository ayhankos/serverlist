import prisma from "@/prisma/database";

export async function getStreamers() {
  const streamers = await prisma.streamer.findMany();
  console.log(streamers);
  prisma.$disconnect();
  return streamers;
}
