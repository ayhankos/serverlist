import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function Page() {
  const adLeft = await prisma.advertisement.findUnique({
    where: { location: "Giris sayfasi sol" },
  });

  const adRight = await prisma.advertisement.findUnique({
    where: { location: "Giris sayfasi sag" },
  });

  const mainAdLeft = await prisma.mainAdvertisementTextSol.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  const mainAdRight = await prisma.mainAdvertisementTextSag.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex h-screen">
      <div
        className="flex-1 bg-no-repeat bg-cover flex justify-center items-center"
        style={{
          backgroundImage: `url(${adLeft?.imagePath || "/gifs/preview.gif"})`,
        }}
      >
        <div className="w-full max-w-md px-4">
          <ServerCard
            title={mainAdLeft?.title || "Metin2 Pvp Server Reklam"}
            date={mainAdLeft?.date || ""}
            description={mainAdLeft?.description || ""}
            ctaText={mainAdLeft?.ctaText || ""}
            href={mainAdLeft?.ctaText || "/metin2serverler"}
          />
        </div>
      </div>
      <div
        className="flex-1 bg-no-repeat bg-cover flex justify-center items-center"
        style={{
          backgroundImage: `url(${adRight?.imagePath || "/gifs/standard.gif"})`,
        }}
      >
        <div className="w-full max-w-md px-4">
          <ServerCard
            title={mainAdRight?.title || "Metin2 Pvp Server Reklam"}
            date={mainAdRight?.date || ""}
            description={mainAdRight?.description || ""}
            ctaText={mainAdRight?.ctaText || ""}
            href={mainAdRight?.ctaText || "/metin2serverler"}
          />
        </div>
      </div>
    </div>
  );
}

interface ServerCardProps {
  title: string;
  date: string;
  description: string;
  ctaText: string;
  href?: string;
}

const ServerCard = ({
  title,
  date,
  description,
  ctaText,
  href,
}: ServerCardProps) => (
  <Card className="w-full bg-black bg-opacity-70 text-white p-4 flex flex-col justify-between">
    <CardContent className="p-0">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-xl text-yellow-500 mb-2">{date}</p>
      <p className="mb-4">{description}</p>
    </CardContent>
    {href ? (
      <Link
        href={href}
        className="bg-white text-black py-2 px-4 self-start hover:bg-gray-100 transition-colors"
      >
        {ctaText || "Detaylar"}
      </Link>
    ) : (
      <button className="bg-white text-black py-2 px-4 self-start hover:bg-gray-100 transition-colors">
        {ctaText || "Detaylar"}
      </button>
    )}
  </Card>
);
