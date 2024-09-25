"use client";
import React, { useState } from "react";
import { RegularServerTable } from "@/components/RegularTables";
import { VipServerTable } from "@/components/VipTables";
import Image from "next/image";
import { HeaderMain } from "@/components/layout/home/header";
import { Menu } from "lucide-react";

const AdBanner = ({
  src,
  alt,
  height,
}: {
  src: string;
  alt: string;
  height: number;
}) => (
  <div className="relative w-full h-auto" style={{ height: `${height}px` }}>
    <Image src={src} alt={alt} layout="fill" objectFit="cover" />
  </div>
);

const MobileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-white focus:outline-none"
      >
        <Menu size={24} />
        <span className="ml-2">Menu</span>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Home
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Servers
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            About
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Contact
          </a>
        </div>
      )}
    </div>
  );
};

export default function Metin2PvpPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-700 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/gifs/preview.gif"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
          </div>
          <div className="hidden sm:block">
            <HeaderMain />
          </div>
          <div className="sm:hidden">
            <MobileDropdown />
          </div>
          <div
            className="flex items-center space-x-4"
            style={{ minWidth: "200px" }}
          >
            <button className="bg-white text-black px-4 py-2 rounded-md">
              Sunucunu Ekle
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left Ad Video */}
        <div className="hidden lg:block w-[18.75rem] h-screen sticky top-0">
          <video
            src="/adds/reklam.webm"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            {/* Top Banner */}
            <AdBanner src="/gifs/banner.gif" alt="Top Banner Ad" height={130} />

            {/* VIP Servers */}
            <section className="my-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                VIP Sunucular
              </h2>
              <VipServerTable />
            </section>

            {/* Middle Banner */}
            <AdBanner
              src="/gifs/banner.gif"
              alt="Middle Banner Ad"
              height={130}
            />

            {/* Regular Servers */}
            <section className="my-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Normal Sunucular
              </h2>
              <RegularServerTable />
            </section>

            {/* Bottom Banner */}
            <AdBanner
              src="/gifs/banner.gif"
              alt="Bottom Banner Ad"
              height={130}
            />
          </div>
        </main>

        {/* Right Ad Video */}
        <div className="hidden lg:block w-[18.75rem] h-screen sticky top-0">
          <video
            src="/adds/reklam.webm"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4 text-center">
        <p>&copy; 2024 Metin2 PVP Sunucu Listesi. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}
