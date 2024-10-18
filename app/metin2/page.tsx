import { PrismaClient } from "@prisma/client";
import Metin2PvpPage from "../components/ServerList";
import type { Metadata } from "next";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Metin2 PVP Serverlar - Ana Sayfa",
    description: "Metin2 PVP serverlarının en güncel listesi.",
    keywords: ["Metin2", "PVP", "Serverlar", "Güncel Listeler", "Oyun"],
    robots: "index, follow",
    openGraph: {
      title: "Metin2 PVP Serverlar - Ana Sayfa",
      description: "Metin2 PVP serverlarının en güncel listesi.",
      images: "/images/bg.png",
      url: "https://pvpserverlar.tr/",
    },
  };
}

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
