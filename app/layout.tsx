import type { Metadata } from "next";
import { Alegreya_Sans, Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import TawkToChat from "@/components/TawkToChat";
import DiscordWidget from "@/components/DiscordWidget";
import Script from "next/script";
import Head from "next/head";

const MontserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
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
    "Pvp serverlar",
  ],
  robots: "index, follow",
  icons: {
    icon: "/images/favicon.png",
  },
  openGraph: {
    title: "Metin2 PVP Serverlar - En Güncel Metin2 PVP Server Listesi",
    description:
      "Türkiye'nin en güncel Metin2 PVP server listesi. Yeni ve aktif Metin2 PVP sunucularına hemen katılın. Her hafta güncellenen serverlar ile en iyi oyun deneyimini yaşayın.",
    images: ["https://pvpserverlar.tr/images/bgOpen.png"],
    url: "https://pvpserverlar.tr/",
    type: "website",
    locale: "tr_TR",
    siteName: "PVP Serverlar",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pvpserverlar",
    creator: "@pvpserverlar",
  },
  alternates: {
    canonical: "https://pvpserverlar.tr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://pvpserverlar.tr" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={metadata.title?.toString() ?? ""} />
        <meta property="og:description" content={metadata.description ?? ""} />
        <meta
          property="og:image"
          content="https://pvpserverlar.tr/images/bgOpen.png"
        />
        <meta property="og:url" content="https://pvpserverlar.tr" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="PVP Serverlar" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pvpserverlar" />
        <meta name="twitter:creator" content="@pvpserverlar" />
        <meta
          name="robots"
          content={metadata.robots?.toString() ?? "index, follow"}
        />
        <meta name="googlebot" content="index, follow" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PVP Serverlar" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
      </Head>
      <body className={cn("font-sans antialiased", MontserratFont.variable)}>
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
                  function gtag(){dataLayer.push(arguments);
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
