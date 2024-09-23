"use client";
import React from "react";
import { Button } from "../button";

export default function Web3ConnectButton() {
  return (
    <>
      <Button className="gap-2 font-bold bg-[#2b2b2b] text-white hover:bg-[#2b2b2b]/70">
        <p>Connect Wallet</p>
      </Button>
    </>
  );
}
