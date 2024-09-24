"use client";
import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaSearch, FaWallet } from "react-icons/fa";
import { Search } from "lucide-react";
import Image from "next/image";
import { ChangeDarkModeButton } from "../changeThemeButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import Web3ConnectButton from "@/components/ui/custom/Web3ConnectButton";
import Link from "next/link";

export default function Header() {
  const { theme } = useTheme();

  const [searching, setSearching] = React.useState(false);

  const handleSearch = () => {
    setSearching(!searching);
  };

  return (
    <header className="flex flex-row justify-between items-center p-4 dark:bg-neutral-900 border-b">
      <div className="flex flex-row items-center gap-4">
        <Link href="/">
          <Image src={``} alt="" width={250} height={100} />
        </Link>
      </div>
      <div className="w-1/2">
        {searching && (
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
        )}
      </div>
      <div className="flex flex-row items-center gap-4 justify-center">
        <div className="flex flex-row">
          <div
            onClick={handleSearch}
            className="rounded-full bg-[#2b2b2b] w-12 h-12 justify-center items-center flex"
          >
            <Search size={20} color="#fff" />
          </div>
        </div>

        <ChangeDarkModeButton />
      </div>
    </header>
  );
}
