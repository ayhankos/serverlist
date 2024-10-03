import { PrismaClient } from "@prisma/client";
import Metin2PvpPage from "../components/ServerList";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function Page() {
  const adLeft = await prisma.advertisement.findUnique({
    where: { location: "Ana sayfa sol" },
  });

  const adRight = await prisma.advertisement.findUnique({
    where: { location: "Ana sayfa sag" },
  });

  const adTop = await prisma.advertisement.findUnique({
    where: { location: "Ana sayfa ust" },
  });

  const adBottom = await prisma.advertisement.findUnique({
    where: { location: "Ana sayfa alt" },
  });

  return (
    <Metin2PvpPage
      adLeft={adLeft?.imagePath || "/gifs/standard.gif"}
      adRight={adRight?.imagePath || "/gifs/standard.gif"}
      adTop={adTop?.imagePath || "/gifs/standard.gif"}
      adBottom={adBottom?.imagePath || "/gifs/standard.gif"}
    />
  );
}
