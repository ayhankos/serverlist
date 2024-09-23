import React from "react";
import { RegularServerTable } from "@/components/RegularTables";
import { VipServerTable } from "@/components/VipTables";

const AdBanner = ({ width, height }: { width: string; height: string }) => (
  <div
    className={`bg-gray-200 flex items-center justify-center text-gray-500 border border-gray-300 rounded w-full h-full`}
  >
    Reklam Alanı
  </div>
);

export default function Metin2PvpPage() {
  return (
    <div className="bg-gray-100 min-h-screen text-black flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Metin2 PVP Sunucuları</h1>
        </header>

        <main className=" mx-10 p-4 lg:px-0">
          <div className="fixed left-0 top-0 w-[300px] h-screen hidden lg:block">
            <video
              src="/adds/reklam.webm"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
            />
          </div>
          <div className="lg:ml-[300px] lg:mr-[300px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <AdBanner width="100%" height="100px" />
              <AdBanner width="100%" height="100px" />
            </div>
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">VIP Sunucular</h2>
              <VipServerTable />
            </section>

            <div className="mb-8">
              <AdBanner width="100%" height="90px" />
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Normal Sunucular</h2>
              <RegularServerTable />
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <AdBanner width="100%" height="250px" />
              <AdBanner width="100%" height="250px" />
              <AdBanner width="100%" height="250px" />
            </div>
          </div>
          <div className="fixed right-0 top-0 w-[300px] h-screen hidden lg:block">
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
