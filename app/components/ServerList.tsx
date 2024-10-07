"use client";
import React, { useState } from "react";
import { RegularServerTable } from "@/components/RegularTables";
import { VipServerTable } from "@/components/VipTables";
import VipStreamers from "@/components/VipStreamers";
import { ArrowUp, Menu } from "lucide-react";
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
    <a href="/" className="text-gray-100 hover:text-gray-300 transition-colors">
      Ana Sayfa
    </a>
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
      <span className="hidden sm:inline">Sunucuya Katıl</span>
    </Button>
  </Link>
);

const Marque = () => (
  <div className="py-1 marquee items-center px-5">
    <p className="font-extrabold text-xl md:text-2xl text-center">
      Daha fazla bilgi için discord sunucumuza katılarak bize ulaşabilirsiniz.
    </p>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-black py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          <div className="flex items-center justify-center sm:justify-start space-x-2"></div>

          <div className="text-center text-sm ">
            <p>© {currentYear} Pvp Serverlar</p>
            <p className="text-xs mt-1 ">Tüm hakları saklıdır</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <a
              href="#header"
              className="text-sm  hover:text-gray-700 transition-colors flex items-center space-x-1"
            >
              <ArrowUp size={20} />
              <span>Başa dön</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Metin2PvpPage({
  adLeft,
  adRight,
  adTop,
  adBottom,
}: Metin2PvpPageProps) {
  const SideAd = ({ src }: { src: string }) => (
    <div className="w-full h-full relative">
      <img
        src={src}
        alt="Side Advertisement"
        className="object-cover"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );

  const AdBanner = ({ src }: { src: string }) => (
    <div className="relative w-full">
      <img
        src={src}
        alt="Advertisement Banner"
        className="object-cover w-full"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Ad */}
        <div className="hidden lg:block lg:w-[14rem] lg:h-screen lg:sticky lg:top-0">
          <SideAd src={adLeft} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header
            id="header"
            className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 p-4 shadow-xl z-50 font-bold"
          >
            <div className="mx-auto flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center space-x-2 sm:space-x-4"
              >
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="rounded-full "
                  style={{
                    width: "150px",
                    height: "80px",
                  }}
                />
              </Link>

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
          <main className="container mx-auto py-2 px-2 sm:px-4">
            {/* VIP Section */}
            <AdBanner src={adTop} />
            <div className="my-5">
              <Link
                href="https://discord.com/invite/pvpserverlar"
                target="_blank"
              >
                <div className="sm:px-0 lg:mx-40">
                  <Marque />
                </div>
              </Link>
            </div>

            <section id="vip-section" className="my-5">
              <h2 className="text-3xl font-extrabold mb-4 text-gray-800">
                VIP Sunucular
              </h2>
              <VipServerTable />
            </section>
            {/* Regular Section */}
            <section id="regular-section" className="my-10">
              <h2 className="text-3xl font-extrabold mb-4 text-gray-800">
                Normal Sunucular
              </h2>
              <RegularServerTable />
            </section>
            {/* Streamers Section */}
            <section id="streamers-section" className="my-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-extrabold text-gray-800">
                  VIP Yayıncılar
                </h2>
                <Link href="/streamers">
                  <Button>Tüm Yayıncılar</Button>
                </Link>
              </div>
              <VipStreamers />
            </section>
            {/* Bottom Ad */}
            <AdBanner src={adBottom} />
          </main>
          <Footer />
        </div>

        {/* Right Ad */}
        <div className="hidden lg:block lg:w-[14rem] lg:h-screen lg:sticky lg:top-0">
          <SideAd src={adRight} />
        </div>
      </div>
    </div>
  );
}
