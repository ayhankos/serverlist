"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HomePageProps {
  adLeft: any;
  adRight: any;
  mainAdLeft: any;
  mainAdRight: any;
}

export default function HomePage({
  adLeft,
  adRight,
  mainAdLeft,
  mainAdRight,
}: HomePageProps) {
  return (
    <div className="flex h-screen">
      <div className="flex-1 relative">
        <Image
          src={adLeft?.imagePath || "/gifs/son.gif"}
          alt="Left background"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="relative z-10 w-full h-full flex justify-center items-center bg-black bg-opacity-40">
          <div className="w-full max-w-md px-4 text-center">
            <ServerCard
              title={mainAdLeft?.title || "Metin2 Pvp Server Reklam"}
              date={mainAdLeft?.date || ""}
              description={mainAdLeft?.description || ""}
              href={"/metin2"}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 relative">
        <Image
          src={adRight?.imagePath || "/gifs/son.gif"}
          alt="Right background"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="relative z-10 w-full h-full flex justify-center items-center bg-black bg-opacity-40">
          <div className="w-full max-w-md px-4 text-center">
            <ServerCard
              title={mainAdRight?.title || "Metin2 Pvp Server Reklam"}
              date={mainAdRight?.date || ""}
              description={mainAdRight?.description || ""}
              href={"/metin2"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ServerCardProps {
  title: string;
  date: string;
  description: string;
  href?: string;
}

const ServerCard = ({ title, date, description, href }: ServerCardProps) => (
  <Card className="w-full bg-black bg-opacity-30 text-white p-4 flex flex-col justify-between space-y-20 border-none">
    <CardContent className="p-0">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-xl text-yellow-500 mb-2">{date}</p>
      <p className="mb-4">{description}</p>
    </CardContent>
    {href ? (
      <Link href={href}>
        <Button variant={"outline"} className="text-black">
          {"Giriş Yap"}
        </Button>
      </Link>
    ) : (
      <Button variant={"outline"} className="text-black">
        {"Giriş Yap"}
      </Button>
    )}
  </Card>
);
