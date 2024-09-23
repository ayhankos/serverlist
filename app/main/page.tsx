import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

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
  <Card className="w-1/2 bg-black text-white p-4 flex flex-col justify-between">
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

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="flex w-full max-w-4xl space-x-10">
        <ServerCard
          title="Metin2 Pvp Server Reklam"
          date="27.09.2024"
          description="1-99 OLD SCHOOL Ön Kayıta Özel 30.000 EM Hediye!"
          ctaText="TIKLA"
          href="/metin2serverler"
        />
        <ServerCard
          title="Knight Online Pvp Server Reklam"
          date="4 EKİM 22:00'DA"
          description="BORDERKO 1098 ANELERIN SAVAŞI"
          ctaText="TIKLA"
          href="/knightserverler"
        />
      </div>
      <Link className="absolute bottom-4 text-white" href="/metin2serverler">
        Server List
      </Link>
    </div>
  );
}
