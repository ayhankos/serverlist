import React from "react";
import { RegularServerTable } from "@/components/RegularTables";
import { VipServerTable } from "@/components/VipTables";
import Image from "next/image";

const AdBanner = ({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) => (
  <div className="relative w-full" style={{ height: `${height}px` }}>
    <Image src={src} alt={alt} layout="fill" objectFit="cover" />
  </div>
);

export default function Metin2PvpPage() {
  return (
    <div className="bg-gray-100 min-h-screen text-black flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
          <h1 className="text-2xl font-bold text-center">
            Metin2 PVP Sunucuları
          </h1>
        </header>

        <main className="mx-2 sm:mx-6 lg:mx-20 xl:mx-32 p-4 lg:px-0">
          <div className="fixed left-0 top-0 w-[18.75rem] h-screen hidden lg:block">
            <video
              src="/adds/reklam.webm"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
            />
          </div>
          <div className="lg:ml-[300px] lg:mr-[300px]">
            <AdBanner
              src="/gifs/banner.gif"
              alt="Top Banner Ad"
              width={700}
              height={130}
            />

            <section className="my-2">
              <h2 className="text-xl font-semibold mb-4">VIP Sunucular</h2>
              <VipServerTable />
            </section>

            <AdBanner
              src="/gifs/banner.gif"
              alt="Middle Banner Ad"
              width={700}
              height={130}
            />

            <section className="my-8">
              <h2 className="text-xl font-semibold mb-4">Normal Sunucular</h2>
              <RegularServerTable />
            </section>

            <AdBanner
              src="/gifs/banner.gif"
              alt="Bottom Banner Ad"
              width={700}
              height={130}
            />
          </div>
          <div className="fixed right-0 top-0 w-[18.75rem] h-screen hidden lg:block">
            <video
              src="/adds/reklam.webm"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
            />
          </div>
        </main>

        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2024 Metin2 PVP Sunucu Listesi. Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </div>
  );
}
