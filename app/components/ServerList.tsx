"use client";
import React, { useState } from "react";
import { RegularServerTable } from "@/components/RegularTables";
import { VipServerTable } from "@/components/VipTables";
import VipStreamers from "@/components/VipStreamers";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";

interface Metin2PvpPageProps {
  adLeft: string;
  adRight: string;
  adTop: string;
  adBottom: string;
}

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
            href="#vip-section"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            VIP Sunucular
          </a>
          <a
            href="#regular-section"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Normal Sunucular
          </a>
          <a
            href="#streamers-section"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            VIP Yayıncılar
          </a>
        </div>
      )}
    </div>
  );
};

const DesktopNavbar = () => (
  <nav className="flex justify-center space-x-6">
    <a
      href="#vip-section"
      className="text-gray-100 hover:text-gray-300 transition-colors"
    >
      VIP Sunucular
    </a>
    <a
      href="#regular-section"
      className="text-gray-100 hover:text-gray-300 transition-colors"
    >
      Normal Sunucular
    </a>
    <a
      href="#streamers-section"
      className="text-gray-100 hover:text-gray-300 transition-colors"
    >
      VIP Yayıncılar
    </a>
    <a
      href="https://pvpserverlar.tr/streamers"
      className="text-gray-100 hover:text-gray-300 transition-colors"
    >
      Tüm Yayıncılar
    </a>
  </nav>
);

const DiscordButton = () => (
  <Link href="https://discord.com/invite/pvpserverlar" target="_blank">
    <Button className="bg-[#5570d0] hover:bg-[#5e73bc] text-white rounded-md flex items-center space-x-2">
      <FaDiscord size={20} />
      <span className="hidden sm:inline">Join Discord</span>
    </Button>
  </Link>
);

export default function Metin2PvpPage({
  adLeft,
  adRight,
  adTop,
  adBottom,
}: Metin2PvpPageProps) {
  const SideAd = ({ src }: { src: string }) => (
    <div className="w-full h-full relative">
      <Image src={src} alt="Side Advertisement" fill className="object-cover" />
    </div>
  );

  const AdBanner = ({ src, height }: { src: string; height: number }) => (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <Image
        src={src}
        alt="Advertisement Banner"
        fill
        className="object-cover"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Ad */}
        <div className="hidden lg:block lg:w-[15rem] lg:h-screen lg:sticky lg:top-0">
          <SideAd src={adLeft} />
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
                <DesktopNavbar />
              </div>
              <div className="flex items-center space-x-4">
                <DiscordButton />
                <div className="lg:hidden">
                  <MobileDropdown />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            {/* burasi buyuyecek */}
            <AdBanner src={adTop} height={60} />

            {/* VIP Section */}
            <section id="vip-section" className="my-10">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                VIP Sunucular
              </h2>
              <VipServerTable />
            </section>

            {/* Regular Section */}
            <section id="regular-section" className="my-10">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Normal Sunucular
              </h2>
              <RegularServerTable />
            </section>

            {/* Streamers Section */}
            <section id="streamers-section" className="my-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  VIP Yayıncılar
                </h2>
                <Link href="/streamers">
                  <Button>Tüm Yayıncılar</Button>
                </Link>
              </div>
              <VipStreamers />
            </section>

            {/* Bottom Ad */}
            <AdBanner src={adBottom} height={60} />
          </main>
        </div>

        {/* Right Ad */}
        <div className="hidden lg:block lg:w-[15rem] lg:h-screen lg:sticky lg:top-0">
          <SideAd src={adRight} />
        </div>
      </div>
    </div>
  );
}
