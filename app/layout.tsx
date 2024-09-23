import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import TawkToChat from "@/components/TawkToChat";
import dynamic from "next/dynamic";
import DiscordWidget from "@/components/DiscordWidget";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Yang",
  description: "Hizli al sat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TawkToChat />
          <DiscordWidget
            inviteLink="https://discord.com/invite/pvpserverlar"
            serverId="1131696011396522007"
          />
          <div className="h-screen w-full overflow-hidden bg-zinc-100">
            <main
              className="flex h-full w-full overflow-y-auto scroll-smooth bg-opacity-70 backdrop-blur-lg"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255, 255, 255, 0.3) transparent",
              }}
            >
              <div className="w-full h-full flex-1 overflow-auto">
                {children}
              </div>
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
