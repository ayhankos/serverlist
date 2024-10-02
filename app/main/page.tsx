import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Page() {
  const adLeft = await prisma.advertisement.findUnique({
    where: { location: "Giris sayfasi sol" },
  });

  const adRight = await prisma.advertisement.findUnique({
    where: { location: "Giris sayfasi sag" },
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
            title="Metin2 Pvp Server Reklam"
            date="27.09.2024"
            description="1-99 OLD SCHOOL Ön Kayıta Özel 30.000 EM Hediye!"
            ctaText="TIKLA"
            href="/metin2serverler"
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
            title="Knight Online Pvp Server Reklam"
            date="4 EKİM 22:00'DA"
            description="BORDERKO 1098 ANELERIN SAVAŞI"
            ctaText="TIKLA"
            href="/knightserverler"
          />
        </div>
      </div>
    </div>
  );
}

type ServerCardProps = {
  title: string;
  date: string;
  description: string;
  ctaText: string;
  href?: string;
};

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
      <Link href={href} className="bg-white text-black py-2 px-4 self-start">
        {ctaText}
      </Link>
    ) : (
      <button className="bg-white text-black py-2 px-4 self-start">
        {ctaText}
      </button>
    )}
  </Card>
);
