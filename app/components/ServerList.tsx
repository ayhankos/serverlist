"use client";
import React, { useState } from "react";
import { RegularServerTable } from "@/components/RegularTables";
import { VipServerTable } from "@/components/VipTables";
import VipStreamers from "@/components/VipStreamers";
import Image from "next/image";
import { HeaderMain } from "@/components/layout/home/header";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";

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
        className="flex items-center text-gray-100 focus:outline-none"
      >
        <Menu size={24} />
        <span className="ml-2">Menu</span>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Home
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Servers
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            About
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Contact
          </a>
        </div>
      )}
    </div>
  );
};

const SideAd = () => (
  <div className="w-full h-full">
    <img
      src="/adds/sagsol.gif"
      className="w-full h-full object-cover"
      alt="Side Advertisement"
    />
  </div>
);

const DiscordButton = () => (
  <Link href="https://discord.com/invite/pvpserverlar" target="_blank">
    <Button className="bg-[#5570d0] hover:bg-[#5e73bc] text-white rounded-md flex items-center space-x-2">
      <FaDiscord size={20} />
      <span className="hidden sm:inline">Join Discord</span>
    </Button>
  </Link>
);
export default function Metin2PvpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Adds - Hidden on smaller screens */}
        <div className="hidden lg:block lg:w-[15rem] lg:h-screen lg:sticky lg:top-0">
          <SideAd />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 p-4 shadow-xl z-50">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Image
                  src="/gifs/preview.gif"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="rounded-full border border-gray-300"
                />
                <h1 className="text-lg sm:text-2xl font-bold text-gray-100">
                  Metin2 PvP
                </h1>
              </div>
              <div className="hidden lg:block">
                <HeaderMain />
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4 ">
                <Button className="hidden lg:block bg-green-600 hover:bg-green-700 text-white rounded-md text-xs sm:text-sm">
                  Sunucunu Ekle
                </Button>

                <DiscordButton />
                <div className="lg:hidden">
                  <MobileDropdown />
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto">
              {/* Top Banner */}
              <AdBanner
                src="/gifs/reklam2.gif"
                alt="Top Banner Ad"
                height={80}
              />

              {/* VIP Servers */}
              <section className="my-8">
                <h2 className="text-xl font-extrabold mb-4 text-gray-900 px-4">
                  VIP Sunucular
                </h2>
                <VipServerTable />
              </section>

              {/* Middle Banner */}
              <AdBanner
                src="/gifs/reklam2.gif"
                alt="Middle Banner Ad"
                height={80}
              />

              {/* Regular Servers */}
              <section className="my-8">
                <h2 className="text-xl font-extrabold mb-4 text-gray-900 px-4">
                  Normal Sunucular
                </h2>
                <RegularServerTable />
              </section>

              {/* Streamers */}
              <section className="my-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Yayıncılar
                </h2>
                <VipStreamers />
              </section>

              {/* Bottom Banner */}
              <AdBanner
                src="/gifs/reklam2.gif"
                alt="Bottom Banner Ad"
                height={80}
              />
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 text-white p-4 text-center">
            <p>&copy; 2024 Metin2 PVP Sunucu Listesi. Tüm hakları saklıdır.</p>
          </footer>
        </div>

        {/* Right Adds - Hidden on smaller screens */}
        <div className="hidden lg:block lg:w-[15rem] lg:h-screen lg:sticky lg:top-0">
          <SideAd />
        </div>
      </div>
    </div>
  );
}
