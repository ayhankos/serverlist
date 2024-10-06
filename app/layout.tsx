import type { Metadata } from "next";
import { Alegreya_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import TawkToChat from "@/components/TawkToChat";
import DiscordWidget from "@/components/DiscordWidget";
import Script from "next/script";
import { Montserrat } from "next/font/google";

const MontserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const AlegreyaSans = Alegreya_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Metin2 PVP Serverlar - En Güncel Metin2 PVP Server Listesi",
  description:
    "Türkiye'nin en güncel Metin2 PVP server listesi. Yeni ve aktif Metin2 PVP sunucularına hemen katılın. Her hafta güncellenen serverlar ile en iyi oyun deneyimini yaşayın.",
  keywords: [
    "Metin2 PVP",
    "Metin2 PVP server",
    "Metin2 sunucuları",
    "En iyi Metin2 server",
    "Güncel Metin2 PVP server",
    "Metin2 PVP sunucu",
    "Metin2 PVP indir",
    "Yeni Metin2 PVP",
    "Metin2 PVP server listesi",
    "Metin2 private server",
  ],
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", MontserratFont.className)}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {process.env.NEXT_PUBLIC_GA_ID && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `}
              </Script>
            </>
          )}
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
